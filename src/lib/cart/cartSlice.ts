import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/lib/api/products'
import type { Flight } from './CartFlyOverlay'

export interface CartItem {
  product: Product
  quantity: number
}

/** A fly-to-cart animation without its (store-assigned) id. */
export type FlightInput = Omit<Flight, 'id'>

interface CartState {
  items: CartItem[]
  isOpen: boolean
  flights: Flight[]
  nextFlightId: number
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  flights: [],
  nextFlightId: 1,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.product.id === action.payload.id)
      if (existing) existing.quantity += 1
      else state.items.push({ product: action.payload, quantity: 1 })
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.product.id !== action.payload)
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.product.id === action.payload)
      if (item) item.quantity += 1
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.product.id === action.payload)
      if (item) item.quantity = Math.max(1, item.quantity - 1)
    },
    clear(state) {
      state.items = []
    },
    openCart(state) {
      state.isOpen = true
    },
    closeCart(state) {
      state.isOpen = false
    },
    pushFlight(state, action: PayloadAction<FlightInput>) {
      state.flights.push({ id: state.nextFlightId++, ...action.payload })
    },
    endFlight(state, action: PayloadAction<number>) {
      state.flights = state.flights.filter(f => f.id !== action.payload)
    },
  },
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
