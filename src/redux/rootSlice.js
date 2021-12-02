import { combineReducers } from "redux";

import recipeSlice from "./reducers/recipes/recipeSlice";
import userSlice from "./reducers/users/userSlice";

export default combineReducers({
    recipeSlice,
    userSlice,
});