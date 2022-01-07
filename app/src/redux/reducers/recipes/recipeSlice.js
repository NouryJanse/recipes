import { createSlice } from "@reduxjs/toolkit";
import { getRecipeThunk } from "./thunks/getRecipe";
import { getRecipesThunk } from "./thunks/getRecipes";
import { createRecipeThunk } from "./thunks/createRecipe";
import { updateRecipeThunk } from "./thunks/updateRecipe";
import { deleteRecipeThunk } from "./thunks/deleteRecipe";
import ID from "./generateID";

const initialState = {
  data: { recipes: [] },
  status: {
    fetchRecipes: "initial",
  },
};

export const createRecipe = createRecipeThunk;
export const updateRecipe = updateRecipeThunk;
export const getRecipe = getRecipeThunk;
export const getRecipes = getRecipesThunk;
export const deleteRecipe = deleteRecipeThunk;

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state, action) => {
      state.status.getRecipes = "loading";
      state.error = {};
    },
    [getRecipes.rejected]: (state, action) => {
      state.status.getRecipes = "rejected";
      state.error = {};
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.data.recipes = action.payload.recipes;
      state.status.getRecipes = "fulfilled";
      state.error = {};
    },

    [getRecipe.pending]: (state, action) => {
      state.status.fetchRecipe = "loading";
      state.error = {};
    },
    [getRecipe.rejected]: (state, action) => {
      state.status.fetchRecipe = "rejected";
      state.error = {};
    },
    [getRecipe.fulfilled]: (state, action) => {
      state.data.recipe = action.payload.recipes;
      state.status.fetchRecipe = "fulfilled";
      state.error = {};
    },

    [updateRecipe.pending]: (state, action) => {
      state.status.updateRecipe = "loading";
      state.error = {};
    },
    [updateRecipe.rejected]: (state, action) => {
      state.status.updateRecipe = "rejected";
      state.error = {};
    },
    [updateRecipe.fulfilled]: (state, action) => {
      state.data.recipes = action.payload.recipes;
      state.status.updateRecipe = "fulfilled";
      state.error = {};
    },

    [createRecipe.pending]: (state, action) => {
      state.status.createRecipe = "loading";
      state.error = {};
    },
    [createRecipe.rejected]: (state, action) => {
      state.status.createRecipe = "error";
      state.error = {};
    },
    [createRecipe.fulfilled]: (state, action) => {
      state.data.recipes = action.payload.recipes;
      state.status.createRecipe = "fulfilled";
      state.error = {};
    },

    [deleteRecipe.pending]: (state, action) => {
      state.status.deleteRecipe = "loading";
      state.error = {};
    },
    [deleteRecipe.rejected]: (state, action) => {
      state.status.deleteRecipe = "error";
      state.error = {};
    },
    [deleteRecipe.fulfilled]: (state, action) => {
      state.data.recipes = action.payload.recipes;
      state.status.deleteRecipe = "fulfilled";
      state.error = {};
    },
  },
});

export const {} = recipeSlice.actions;

export const selectRecipes = (state) => state.recipes.data;

export default recipeSlice.reducer;
