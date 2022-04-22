import { combineReducers } from '@reduxjs/toolkit'

import applicationSlice from './reducers/application/applicationSlice'
import recipeSlice from './reducers/recipes/recipeSlice'
import userSlice from './reducers/users/userSlice'

const rootReducer = combineReducers({
  applicationSlice,
  recipeSlice,
  userSlice,
})

export default rootReducer
