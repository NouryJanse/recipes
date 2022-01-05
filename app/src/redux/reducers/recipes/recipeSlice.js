import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesThunk } from "./thunks/fetchRecipes";
// import { getRecipeThunk } from "./thunks/getRecipe";
import { createRecipeThunk } from "./thunks/createRecipe";
// import { updateRecipeThunk } from "./thunks/updateRecipe";
// import { deleteRecipeThunk } from "./thunks/deleteRecipe";
import ID from "./generateID";

const initialState = {
  data: { recipes: [] },
  status: {
    fetchRecipes: "initial",
  },
};

export const createRecipe = createRecipeThunk;
export const fetchRecipes = fetchRecipesThunk;

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // createRecipe: (state, action = {}) => {
    //   state.data.recipes = [
    //     ...state.data.recipes,
    //     { id: ID(), ...action.payload },
    //   ];
    // },
    removeRecipeById: (state, action = {}) => {
      state.data.recipes = state.data.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    editRecipeById: (state, action = {}) => {
      const updatedRecipe = {
        ...action.payload.currentRecipe,
        ...action.payload.newRecipe,
      };
      state.data.recipes = state.data.recipes.map((recipe) => {
        return recipe.id === action.payload.id ? updatedRecipe : recipe;
      });
    },
  },
  extraReducers: {
    [fetchRecipes.pending]: (state, action) => {
      state.status.fetchRecipes = "loading";
      state.error = {};
    },
    [fetchRecipes.fulfilled]: (state, action) => {
      state.data.recipes = action.payload.recipes;
      state.status.fetchRecipes = "fulfilled";
      state.error = {};
    },
    [createRecipe.pending]: (state, action) => {
      console.log(action);
      state.status.createRecipe = "loading";
      state.error = {};
    },
    [createRecipe.rejected]: (state, action) => {
      console.log(action);
      state.status.createRecipe = "error";
      state.error = {};
    },
    [createRecipe.fulfilled]: (state, action) => {
      console.log(action);
      // if (action.payload.id) {
      //   state.data.recipes = state.data.recipes.map((recipe) => {
      //     return recipe.id === action.payload.id ? action.payload : recipe;
      //   });
      // }
      state.status.saveRecipe = "fulfilled";
      state.error = {};
    },
  },
});

export const { addRecipe, removeRecipeById, editRecipeById } =
  recipeSlice.actions;

export const selectRecipes = (state) => state.recipes.data;

export default recipeSlice.reducer;
