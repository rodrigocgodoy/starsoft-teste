'use client'

import { useEffect, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import { CartFlyOverlay } from './CartFlyOverlay'
import { cartActions } from './cartSlice'
import { makeStore, useAppDispatch, useAppSelector, useAppStore } from './store'

// Interaction-gated drawer — split into its own client-only chunk.
const CartDrawer = dynamic(
  () => import('@/components/cart/CartDrawer').then(m => m.CartDrawer),
  { ssr: false },
)

const STORAGE_KEY = 'starsoft:cart'

export function CartProvider({ children }: { children: ReactNode }) {
  // One store per browser session, created lazily.
  const [store] = useState(makeStore)

  return (
    <Provider store={store}>
      <CartSync />
      {children}
      <CartDrawer />
      <CartFlights />
    </Provider>
  )
}

/** Hydrates the cart from localStorage on mount, then persists on change. */
function CartSync() {
  const store = useAppStore()

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) store.dispatch(cartActions.hydrate(JSON.parse(raw)))
    } catch {
      // Ignore malformed storage.
    }

    const unsubscribe = store.subscribe(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(store.getState().cart.items),
        )
      } catch {
        // Ignore quota / privacy-mode errors.
      }
    })
    return unsubscribe
  }, [store])

  return null
}

/** Renders the fly-to-cart animations from store state. */
function CartFlights() {
  const flights = useAppSelector(s => s.cart.flights)
  const dispatch = useAppDispatch()
  return (
    <CartFlyOverlay
      flights={flights}
      onDone={id => dispatch(cartActions.endFlight(id))}
    />
  )
}
