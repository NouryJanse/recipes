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
        showFirstItem: ( state, action = {} ) => {
            state.data.recipes = state.data[0];
        },        
        addRecipe: (state, action = {} ) => {
            state.data.recipes = [...state.data.recipes, {...action.payload, id: state.data.recipes.length + 1}];
        },
        removeRecipeById: (state, action = {} ) => {
            state.data.recipes = state.data.recipes.filter(recipe => recipe.id !== action.payload);
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

export const { showFirstItem, addRecipe, removeRecipeById } = recipeSlice.actions;

export const selectRecipes = (state) => state.recipes.data;

export default recipeSlice.reducer;