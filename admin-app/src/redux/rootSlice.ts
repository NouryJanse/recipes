import { combineReducers } from '@reduxjs/toolkit'

import applicationSlice from './reducers/application/applicationSlice'
import ingredientSlice from './reducers/ingredients/ingredientSlice'
import recipeSlice from './reducers/recipes/recipeSlice'
import userSlice from './reducers/users/userSlice'
import { recipesAPI } from './reducers/recipes/recipes'
import { ingredientsAPI } from './reducers/ingredients/ingredients'

const rootReducer = combineReducers({
  [recipesAPI.reducerPath]: recipesAPI.reducer,
  [ingredientsAPI.reducerPath]: ingredientsAPI.reducer,
  applicationSlice,
  // ingredientSlice,
  recipeSlice,
  userSlice,
})

export default rootReducer
