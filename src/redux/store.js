import { configureStore } from '@reduxjs/toolkit';
import * as appReducer from './rootSlice';

// import recipeReducer from '../features/recipes/recipeSlice';

export const store = configureStore({
    reducer: appReducer,
});
// export const store = configureStore({
//     reducer: {
//         recipes: recipeReducer,
//     },
// });