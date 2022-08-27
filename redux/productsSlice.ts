import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'types'


const initialState: { products: Product[] } = {
  products: [],
}

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    
  },
})

export const {getProducts} = ProductsSlice.actions
export default ProductsSlice.reducer





