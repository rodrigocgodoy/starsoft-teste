import type { ReactNode } from 'react'
import { act, renderHook } from '@testing-library/react'
import type { Product } from '@/lib/api/products'
import { CartProvider } from './CartProvider'
import { useCart } from './useCart'

const product = (id: number, price: string): Product => ({
  id,
  name: `Item ${id}`,
  description: 'desc',
  image: `https://example.com/${id}.png`,
  price,
  createdAt: '2024-01-01T00:00:00.000Z',
})

function setup() {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )
  return renderHook(() => useCart(), { wrapper })
}

beforeEach(() => localStorage.clear())

describe('cart (redux toolkit)', () => {
  it('adds items and increments quantity for duplicates', () => {
    const { result } = setup()

    act(() => result.current.addItem(product(1, '100')))
    expect(result.current.count).toBe(1)

    act(() => result.current.addItem(product(1, '100')))
    expect(result.current.count).toBe(2)
    expect(result.current.items).toHaveLength(1)
  })

  it('computes the total from price × quantity', () => {
    const { result } = setup()

    act(() => {
      result.current.addItem(product(1, '100'))
      result.current.addItem(product(1, '100'))
      result.current.addItem(product(2, '50'))
    })

    expect(result.current.total).toBe(250)
    expect(result.current.count).toBe(3)
  })

  it('never decrements below one and removes on request', () => {
    const { result } = setup()

    act(() => result.current.addItem(product(1, '100')))
    act(() => result.current.decrement(1))
    expect(result.current.items[0].quantity).toBe(1)

    act(() => result.current.removeItem(1))
    expect(result.current.items).toHaveLength(0)
  })

  it('persists the cart to localStorage', () => {
    const { result } = setup()

    act(() => result.current.addItem(product(7, '42')))

    const stored = JSON.parse(localStorage.getItem('starsoft:cart') ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].product.id).toBe(7)
  })
})
