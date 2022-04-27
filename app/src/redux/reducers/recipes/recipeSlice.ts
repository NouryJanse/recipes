import { createSlice } from '@reduxjs/toolkit'
import { getRecipeThunk } from './thunks/getRecipe'
import { getRecipesThunk } from './thunks/getRecipes'
import { createRecipeThunk } from './thunks/createRecipe'
import { updateRecipeThunk } from './thunks/updateRecipe'
import { deleteRecipeThunk } from './thunks/deleteRecipe'
import RecipeState from '../../../types/RecipeState'

const initialState = {
  data: { recipes: [], recipe: {} },
  status: {
    getRecipe: 'initial',
    getRecipes: 'initial',
    createRecipe: 'initial',
    updateRecipe: 'initial',
    deleteRecipe: 'initial',
  },
  error: {},
}

export const getRecipe = getRecipeThunk
export const getRecipes = getRecipesThunk
export const createRecipe = createRecipeThunk
export const updateRecipe = updateRecipeThunk
export const deleteRecipe = deleteRecipeThunk

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state, _action) => {
      state.status.getRecipes = 'loading'
      state.error = {}
    })
    builder.addCase(getRecipes.rejected, (state, _action) => {
      state.status.getRecipes = 'rejected'
      state.error = {}
    })
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      if (action !== null && action.payload) {
        state.data.recipes = action.payload
      }
      state.status.getRecipes = 'fulfilled'
      state.error = {}
    })

    builder.addCase(getRecipe.pending, (state, _action) => {
      state.status.getRecipe = 'loading'
      state.error = {}
    })
    builder.addCase(getRecipe.rejected, (state, _action) => {
      state.status.getRecipe = 'rejected'
      state.error = {}
    })
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      if (action !== null && action.payload) {
        state.data.recipe = action.payload['recipes']
      }
      state.status.getRecipe = 'fulfilled'
      state.error = {}
    })

    builder.addCase(updateRecipe.pending, (state, _action) => {
      state.status.updateRecipe = 'loading'
      state.error = {}
    })
    builder.addCase(updateRecipe.rejected, (state, _action) => {
      state.status.updateRecipe = 'rejected'
      state.error = {}
    })
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      if (action !== null && action.payload) {
        state.data.recipe = action.payload['recipes']
      }
      state.status.updateRecipe = 'fulfilled'
      state.error = {}
    })

    builder.addCase(createRecipe.pending, (state, _action) => {
      state.status.createRecipe = 'loading'
      state.error = {}
    })
    builder.addCase(createRecipe.rejected, (state, _action) => {
      state.status.createRecipe = 'rejected'
      state.error = {}
    })
    builder.addCase(createRecipe.fulfilled, (state, _action) => {
      state.status.createRecipe = 'fulfilled'
      state.error = {}
    })

    builder.addCase(deleteRecipe.pending, (state, _action) => {
      state.status.deleteRecipe = 'loading'
      state.error = {}
    })
    builder.addCase(deleteRecipe.rejected, (state, _action) => {
      state.status.deleteRecipe = 'rejected'
      state.error = {}
    })
    builder.addCase(deleteRecipe.fulfilled, (state, _action) => {
      state.status.deleteRecipe = 'fulfilled'
      state.error = {}
    })
  },
})

export const selectRecipes = (state: RecipeState) => state.data.recipes

export default recipeSlice.reducer
