import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  const baseProps = {
    title: 'Star Wand',
    description: 'A magical wand',
    price: '42',
    image: { src: '/star-wand.png', alt: 'Star Wand' },
  }

  it('renders the title, price and CTA', () => {
    render(<ProductCard {...baseProps} />)

    expect(screen.getByText('Star Wand')).toBeInTheDocument()
    expect(screen.getByText(/42\s*ETH/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'COMPRAR' })).toBeInTheDocument()
  })

  it('fires onBuy when the CTA is pressed', async () => {
    const onBuy = jest.fn()
    render(<ProductCard {...baseProps} onBuy={onBuy} />)

    await userEvent.click(screen.getByRole('button', { name: 'COMPRAR' }))
    expect(onBuy).toHaveBeenCalledTimes(1)
  })

  it('fires onSelect when the image is clicked', async () => {
    const onSelect = jest.fn()
    render(<ProductCard {...baseProps} onSelect={onSelect} />)

    await userEvent.click(
      screen.getByRole('button', { name: /Ver detalhes de Star Wand/ }),
    )
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
