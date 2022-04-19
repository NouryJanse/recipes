import { combineReducers } from 'redux';

import applicationSlice from './reducers/application/applicationSlice';
import recipeSlice from './reducers/recipes/recipeSlice';
import userSlice from './reducers/users/userSlice';

export default combineReducers({
  applicationSlice,
  recipeSlice,
  userSlice,
});
