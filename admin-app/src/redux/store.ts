import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './rootSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { recipesAPI } from './reducers/recipes/recipes'
import { ingredientsAPI } from './reducers/ingredients/ingredients'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesAPI.middleware, ingredientsAPI.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
