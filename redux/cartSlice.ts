import { createSlice, current  } from '@reduxjs/toolkit'
import type { PayloadAction} from '@reduxjs/toolkit'
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
      action: PayloadAction<CartItem>
    ) => {
        
      const cartItem = state.cart.find((e) => 
        e.id == action.payload.id
      )
      console.log(action.payload)
      if (!cartItem) {
        state.cart = [...state.cart, action.payload]
      } else {
        state.cart = state.cart.map((e) => {
          if (e.id == action.payload.id) {
            return {
              ...e,
              quantity:
                (e.quantity! + 1),
            }
          } else {
            return e
          }
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<{}>) => {},
  },
})

export const { addToCart, removeFromCart } = CartSlice.actions
export default CartSlice.reducer
