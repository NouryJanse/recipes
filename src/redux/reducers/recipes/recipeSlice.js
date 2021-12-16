import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesThunk } from './fetchRecipes';
import { saveRecipeThunk } from './saveRecipe';
import ID from './generateID';

const initialState = {
    data: {recipes: []},
    status: {
        fetchRecipes: 'initial',
    },
};

export const saveRecipe = saveRecipeThunk;
export const fetchRecipes = fetchRecipesThunk;

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {     
        addRecipe: (state, action = {} ) => {
            state.data.recipes = [...state.data.recipes, { id: ID(), ...action.payload }];
        },
        removeRecipeById: (state, action = {} ) => {
            state.data.recipes = state.data.recipes.filter(recipe => recipe.id !== action.payload);
        },
        editRecipeById: (state, action = {} ) => {
            const updatedRecipe = {...action.payload.currentRecipe, ...action.payload.newRecipe};
            state.data.recipes = state.data.recipes.map(recipe => {
                return recipe.id === action.payload.id ? updatedRecipe : recipe;
            })
        },
    },
    extraReducers: {
        [fetchRecipes.pending]: (state, action) => {
            state.status.fetchRecipes = 'loading';
            state.error = {};
        },
        [fetchRecipes.fulfilled]: (state, action) => {
            state.data.recipes = action.payload.recipes;
            state.status.fetchRecipes = 'fulfilled';
            state.error = {};
        },
        [saveRecipe.pending]: (state, action) => {
            state.status.saveRecipe = 'loading';
            state.error = {};
        },
        [saveRecipe.fulfilled]: (state, action) => {
            // state.data.recipes = action.payload.recipes;
            state.status.saveRecipe = 'fulfilled';
            state.error = {};
        },
    }
});

export const { addRecipe, removeRecipeById, editRecipeById } = recipeSlice.actions;

export const selectRecipes = (state) => state.recipes.data;

export default recipeSlice.reducer;