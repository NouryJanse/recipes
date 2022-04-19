import { configureStore } from '@reduxjs/toolkit'
import appReducer from './rootSlice'
import thunkMiddleware from 'redux-thunk'

export const store = configureStore({
  reducer: appReducer,
  middleware: [thunkMiddleware],
})
