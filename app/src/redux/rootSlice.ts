import { combineReducers } from '@reduxjs/toolkit'

import applicationSlice from './reducers/application/applicationSlice'
import ingredientSlice from './reducers/ingredients/ingredientSlice'
import recipeSlice from './reducers/recipes/recipeSlice'
import userSlice from './reducers/users/userSlice'

const rootReducer = combineReducers({
  applicationSlice,
  ingredientSlice,
  recipeSlice,
  userSlice,
})

export default rootReducer
