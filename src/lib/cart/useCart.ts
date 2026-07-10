import { useCallback, useMemo } from 'react'
import type { Product } from '@/lib/api/products'
import { cartActions } from './cartSlice'
import { useAppDispatch, useAppSelector } from './store'

/**
 * Cart facade over the Redux slice. Keeps a small, stable API so components
 * stay decoupled from the store implementation.
 */
export function useCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(s => s.cart.items)
  const isOpen = useAppSelector(s => s.cart.isOpen)

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )
  const total = useMemo(
    () =>
      items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0),
    [items],
  )

  const open = useCallback(() => dispatch(cartActions.openCart()), [dispatch])
  const close = useCallback(() => dispatch(cartActions.closeCart()), [dispatch])
  const removeItem = useCallback(
    (id: number) => dispatch(cartActions.removeItem(id)),
    [dispatch],
  )
  const increment = useCallback(
    (id: number) => dispatch(cartActions.increment(id)),
    [dispatch],
  )
  const decrement = useCallback(
    (id: number) => dispatch(cartActions.decrement(id)),
    [dispatch],
  )
  const clear = useCallback(() => dispatch(cartActions.clear()), [dispatch])

  const addItem = useCallback(
    (product: Product, origin?: DOMRect | null) => {
      dispatch(cartActions.addItem(product))

      // Fly a clone of the product image into the cart icon.
      if (!origin) return
      const target = document
        .querySelector('[data-cart-fly-target]')
        ?.getBoundingClientRect()
      if (!target) return
      dispatch(
        cartActions.pushFlight({
          image: product.image,
          from: { x: origin.left, y: origin.top, size: origin.width },
          to: {
            x: target.left + target.width / 2,
            y: target.top + target.height / 2,
          },
        }),
      )
    },
    [dispatch],
  )

  return {
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
  }
}
