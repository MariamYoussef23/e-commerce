import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Product } from 'types'

const initialState: { cart: CartItem[] } = {
  cart: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: CartItem | Product; quantity: number }>
    ) => {
      const cartItem = state.cart.find((e) => {
        e.id === action.payload.product.id
      })
      if (!cartItem) {
        state.cart = [...state.cart, { ...action.payload.product, quantity: 1 }]
      } else {
        state.cart = state.cart.map((e) => {
          if (e.id === action.payload.product.id) {
            return {
              ...e,
              quantity: action.payload.quantity,
            }
          } else {
            return e
          }
        })
      }
    },
    removeFromCart: (state, action: PayloadAction <{}>) => {
    }
  },
})

export const { addToCart, removeFromCart } = CartSlice.actions
export default CartSlice.reducer
