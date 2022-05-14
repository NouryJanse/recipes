import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './rootSlice'
// import thunkMiddleware from 'redux-thunk'

export const store = configureStore({
  reducer: rootReducer,
  //   middleware: [thunkMiddleware],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
