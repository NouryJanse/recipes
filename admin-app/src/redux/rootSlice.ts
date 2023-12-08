import { combineReducers } from '@reduxjs/toolkit'

import applicationSlice from './reducers/application/applicationSlice'
import userSlice from './reducers/users/userSlice'
import { recipesAPI } from './reducers/recipes/recipes'
import { ingredientsAPI } from './reducers/ingredients/ingredients'
import { usersAPI } from './reducers/users/users'

const rootReducer = combineReducers({
  [recipesAPI.reducerPath]: recipesAPI.reducer,
  [ingredientsAPI.reducerPath]: ingredientsAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  applicationSlice,
  userSlice,
})

export default rootReducer
