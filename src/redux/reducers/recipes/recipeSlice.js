import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesThunk } from './fetchRecipes';

const initialState = {
    data: {recipes: []},
    status: {
        fetchRecipes: 'initial',
    },
};

export const fetchRecipes = fetchRecipesThunk;

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        createRecipe: ( state, action = {} ) => {
            state.data = state.data;
        },
        allItems: ( state, action = {} ) => {
            state.data = state.data;
        },        
    },
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.status.fetchRecipes = 'loading';
            state.error = {};
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.data.recipes = action.payload.recipes;
            state.status.fetchRecipes = 'loading';
            state.error = {};
        },
    }
});

export const { createRecipe, allItems } = recipeSlice.actions;

export const selectRecipes = (state) => state.recipes.data;

export default recipeSlice.reducer;