import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Product } from 'types'

const initialState: { cart: CartItem[] } = {
  cart: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = state.cart.find((e) => e.id == action.payload.id)
      console.log(action.payload)
      if (!cartItem) {
        state.cart = [...state.cart, action.payload]
      } else {
        state.cart = state.cart.map((e) => {
          if (e.id == action.payload.id) {
            return {
              ...e,
              quantity: e.quantity! + 1,
            }
          } else {
            return e
          }
        })
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: string, quantity: number }>
    ) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          }
        } else {
          return product
        }
      })
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
        state.cart = state.cart.filter((product)=> product.id != action.payload)
    },
  },
})

export const { addToCart, updateCart ,removeFromCart } = CartSlice.actions
export default CartSlice.reducer
