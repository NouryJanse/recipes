import { createSlice } from '@reduxjs/toolkit'
import { getRecipeThunk } from './thunks/getRecipe'
import { getRecipesThunk } from './thunks/getRecipes'
import { createRecipeThunk } from './thunks/createRecipe'
import { updateRecipeThunk } from './thunks/updateRecipe'
import { deleteRecipeThunk } from './thunks/deleteRecipe'
import { Recipe } from '../../../types/Recipe'

interface State {
  data: { recipes: Recipe[] }
  status: {
    fetchRecipe: string
    getRecipes: string
    createRecipe: string
    updateRecipe: string
    deleteRecipe: string
  }
  error?: {}
}

const initialState = {
  data: { recipes: [] },
  status: {
    fetchRecipes: 'initial',
  },
}

export const createRecipe = createRecipeThunk
export const updateRecipe = updateRecipeThunk
export const getRecipe = getRecipeThunk
export const getRecipes = getRecipesThunk
export const deleteRecipe = deleteRecipeThunk

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state: State) => {
      state.status.getRecipes = 'loading'
      state.error = {}
    },
    [getRecipes.rejected]: (state: State) => {
      state.status.getRecipes = 'rejected'
      state.error = {}
    },
    [getRecipes.fulfilled]: (state: State) => {
      state.data.recipes = action.payload.recipes
      state.status.getRecipes = 'fulfilled'
      state.error = {}
    },

    [getRecipe.pending]: (state: State) => {
      state.status.fetchRecipe = 'loading'
      state.error = {}
    },
    [getRecipe.rejected]: (state: State) => {
      state.status.fetchRecipe = 'rejected'
      state.error = {}
    },
    [getRecipe.fulfilled]: (state: State, action: any) => {
      state.data.recipe = action.payload.recipes
      state.status.fetchRecipe = 'fulfilled'
      state.error = {}
    },

    [updateRecipe.pending]: (state: State) => {
      state.status.updateRecipe = 'loading'
      state.error = {}
    },
    [updateRecipe.rejected]: (state: State) => {
      state.status.updateRecipe = 'rejected'
      state.error = {}
    },
    [updateRecipe.fulfilled]: (state: State, action: any) => {
      state.data.recipes = action.payload.recipes
      state.status.updateRecipe = 'fulfilled'
      state.error = {}
    },

    [createRecipe.pending]: (state: State) => {
      state.status.createRecipe = 'loading'
      state.error = {}
    },
    [createRecipe.rejected]: (state: State) => {
      state.status.createRecipe = 'error'
      state.error = {}
    },
    [createRecipe.fulfilled]: (state: State, action: any) => {
      state.data.recipes = action.payload.recipes
      state.status.createRecipe = 'fulfilled'
      state.error = {}
    },

    [deleteRecipe.pending]: (state: State) => {
      state.status.deleteRecipe = 'loading'
      state.error = {}
    },
    [deleteRecipe.rejected]: (state: State) => {
      state.status.deleteRecipe = 'error'
      state.error = {}
    },
    [deleteRecipe.fulfilled]: (state: State, action: any) => {
      state.data.recipes = action.payload.recipes
      state.status.deleteRecipe = 'fulfilled'
      state.error = {}
    },
  },
})

export const {} = recipeSlice.actions

export const selectRecipes = (state: State) => state.data.recipes

export default recipeSlice.reducer
