import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Collection } from 'types'

const initialState: { collections: Collection[] } = {
  collections: [],
}

export const CollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    getCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload
    },
  },
})

export const { getCollections } = CollectionsSlice.actions
export default CollectionsSlice.reducer
