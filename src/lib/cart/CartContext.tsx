'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '@/lib/api/products'
import { CartFlyOverlay, type Flight } from './CartFlyOverlay'

export interface CartItem {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'starsoft:cart'

type Action =
  | { type: 'hydrate'; items: CartItem[] }
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: number }
  | { type: 'increment'; id: number }
  | { type: 'decrement'; id: number }
  | { type: 'clear' }

function reducer(items: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.items
    case 'add': {
      const existing = items.find(i => i.product.id === action.product.id)
      if (existing) {
        return items.map(i =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...items, { product: action.product, quantity: 1 }]
    }
    case 'remove':
      return items.filter(i => i.product.id !== action.id)
    case 'increment':
      return items.map(i =>
        i.product.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
      )
    case 'decrement':
      return items.map(i =>
        i.product.id === action.id
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i,
      )
    case 'clear':
      return []
    default:
      return items
  }
}

interface CartContextValue {
  items: CartItem[]
  /** Total number of units across all items. */
  count: number
  /** Sum of price × quantity. */
  total: number
  isOpen: boolean
  open: () => void
  close: () => void
  /** Add a product. Pass the source image rect to fly it into the cart. */
  addItem: (product: Product, origin?: DOMRect | null) => void
  removeItem: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)
  const [flights, setFlights] = useState<Flight[]>([])
  const flightId = useRef(0)

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) })
    } catch {
      // Ignore malformed storage.
    }
  }, [])

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore quota / privacy-mode errors.
    }
  }, [items])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product: Product, origin?: DOMRect | null) => {
    dispatch({ type: 'add', product })

    // Fly a clone of the product image into the cart icon.
    if (!origin) return
    const target = document
      .querySelector('[data-cart-fly-target]')
      ?.getBoundingClientRect()
    if (!target) return
    const id = ++flightId.current
    setFlights(f => [
      ...f,
      {
        id,
        image: product.image,
        from: { x: origin.left, y: origin.top, size: origin.width },
        to: {
          x: target.left + target.width / 2,
          y: target.top + target.height / 2,
        },
      },
    ])
  }, [])

  const endFlight = useCallback(
    (id: number) => setFlights(f => f.filter(x => x.id !== id)),
    [],
  )

  const removeItem = useCallback(
    (id: number) => dispatch({ type: 'remove', id }),
    [],
  )
  const increment = useCallback(
    (id: number) => dispatch({ type: 'increment', id }),
    [],
  )
  const decrement = useCallback(
    (id: number) => dispatch({ type: 'decrement', id }),
    [],
  )
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )
  const total = useMemo(
    () =>
      items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0),
    [items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      total,
      isOpen,
      open,
      close,
      addItem,
      removeItem,
      increment,
      decrement,
      clear,
    }),
    [
      items,
      count,
      total,
      isOpen,
      open,
      close,
      addItem,
      removeItem,
      increment,
      decrement,
      clear,
    ],
  )

  return (
    <CartContext value={value}>
      {children}
      <CartFlyOverlay flights={flights} onDone={endFlight} />
    </CartContext>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
