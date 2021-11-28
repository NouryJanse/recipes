import { combineReducers } from "redux";

import recipeSlice from "./reducers/recipeSlice";
import userSlice from "./reducers/userSlice";

export default combineReducers({
    recipes: recipeSlice,
    users: userSlice,
});