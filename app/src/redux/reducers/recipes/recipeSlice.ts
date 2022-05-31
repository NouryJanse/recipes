import { createSlice } from '@reduxjs/toolkit'
import getRecipeThunk from './thunks/getRecipe'
import getRecipesThunk from './thunks/getRecipes'
import createRecipeThunk from './thunks/createRecipe'
import createRecipeImageThunk from './thunks/createRecipeImage'
import deleteRecipeImageThunk from './thunks/deleteRecipeImage'
import updateRecipeThunk from './thunks/updateRecipe'
import deleteRecipeThunk from './thunks/deleteRecipe'
import { REDUX_STATE } from '../../../constants'
import LogHelper from '../../../helpers/LogHelper'
import replaceRecipeWithIdInArrayWithRecipes from './helpers'

export const initialState = {
  data: { recipes: [] as Recipe[] },
  status: {
    getRecipe: 'initial',
    getRecipes: 'initial',
    createRecipe: 'initial',
    createRecipeImage: 'initial',
    deleteRecipeImage: 'initial',
    updateRecipe: 'initial',
    deleteRecipe: 'initial',
  },
  error: {},
}

export const getRecipe = getRecipeThunk
export const getRecipes = getRecipesThunk
export const createRecipe = createRecipeThunk
export const createRecipeImage = createRecipeImageThunk
export const deleteRecipeImage = deleteRecipeImageThunk
export const updateRecipe = updateRecipeThunk
export const deleteRecipe = deleteRecipeThunk

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    resetCreateRecipeStatus: (state) => {
      state.status.createRecipe = REDUX_STATE.INITIAL
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.status.getRecipes = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getRecipes.rejected, (state) => {
      state.status.getRecipes = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.status.getRecipes = REDUX_STATE.FULFILLED
      if (action !== null && action.payload) {
        state.data.recipes = action.payload
      }
      state.error = {}
    })

    builder.addCase(getRecipe.pending, (state) => {
      state.status.getRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getRecipe.rejected, (state) => {
      state.status.getRecipe = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      // eslint-disable-next-line prefer-destructuring
      const recipes: Recipe[] = state.data.recipes
      if (action?.payload) {
        const updatedRecipe: Recipe = action.payload as Recipe
        state.data.recipes = replaceRecipeWithIdInArrayWithRecipes(recipes, updatedRecipe)
      }
      state.status.getRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(updateRecipe.pending, (state) => {
      state.status.updateRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(updateRecipe.rejected, (state) => {
      state.status.updateRecipe = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.status.updateRecipe = REDUX_STATE.FULFILLED
      // eslint-disable-next-line prefer-destructuring
      const recipes: Recipe[] = state.data.recipes
      if (action?.payload) {
        const updatedRecipe: Recipe = action.payload
        state.data.recipes = replaceRecipeWithIdInArrayWithRecipes(recipes, updatedRecipe)
      }
      state.error = {}
    })

    builder.addCase(createRecipeImage.pending, (state) => {
      state.status.createRecipeImage = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(createRecipeImage.rejected, (state) => {
      state.status.createRecipeImage = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(createRecipeImage.fulfilled, (state, action) => {
      if (!action?.payload?.recipeId) return
      state.status.createRecipeImage = REDUX_STATE.FULFILLED
      const recipes: Recipe[] = state.data.recipes.map((recipe: Recipe) => {
        if (recipe.id === action.payload.recipeId) {
          return {
            ...recipe,
            images: recipe?.images?.length ? [...recipe.images, action.payload] : [action.payload],
          }
        }
        return recipe
      })
      state.data.recipes = recipes
      state.error = {}
    })

    builder.addCase(deleteRecipeImage.pending, (state) => {
      state.status.deleteRecipeImage = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(deleteRecipeImage.rejected, (state) => {
      state.status.deleteRecipeImage = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(deleteRecipeImage.fulfilled, (state, _action) => {
      state.status.deleteRecipeImage = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(createRecipe.pending, (state) => {
      state.status.createRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(createRecipe.rejected, (state) => {
      state.status.createRecipe = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(createRecipe.fulfilled, (state) => {
      state.status.createRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(deleteRecipe.pending, (state) => {
      state.status.deleteRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(deleteRecipe.rejected, (state) => {
      state.status.deleteRecipe = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(deleteRecipe.fulfilled, (state) => {
      state.status.deleteRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })
  },
})

export const { resetCreateRecipeStatus } = recipeSlice.actions

export default recipeSlice.reducer
