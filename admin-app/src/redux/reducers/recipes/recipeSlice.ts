import { createSlice } from '@reduxjs/toolkit'
import {
  getRecipeThunk,
  getRecipesThunk,
  createRecipeThunk,
  createRecipeImageThunk,
  deleteRecipeImageThunk,
  updateRecipeThunk,
  deleteRecipeThunk,
} from './thunks'

// import { REDUX_STATE } from '../../../constants'
// import LogHelper from '../../../helpers/LogHelper'
// import replaceRecipeWithIdInArrayWithRecipes from './helpers'

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
    // resetCreateRecipeStatus: (state) => {
    //   state.status.createRecipe = REDUX_STATE.INITIAL
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(updateRecipe.pending, (state) => {
  //       state.status.updateRecipe = REDUX_STATE.LOADING
  //       state.error = {}
  //     })
  //     .addCase(updateRecipe.rejected, (state) => {
  //       state.status.updateRecipe = REDUX_STATE.REJECTED
  //       LogHelper({ logType: 'error', message: 'An error occurred' })
  //       state.error = {}
  //     })
  //     .addCase(updateRecipe.fulfilled, (state, action) => {
  //       state.status.updateRecipe = REDUX_STATE.FULFILLED
  //       // eslint-disable-next-line prefer-destructuring
  //       const recipes: Recipe[] = state.data.recipes
  //       if (action?.payload) {
  //         const updatedRecipe: Recipe = action.payload
  //         state.data.recipes = replaceRecipeWithIdInArrayWithRecipes(recipes, updatedRecipe)
  //       }
  //       state.error = {}
  //     })

  //     .addCase(createRecipeImage.pending, (state) => {
  //       state.status.createRecipeImage = REDUX_STATE.LOADING
  //       state.error = {}
  //     })
  //     .addCase(createRecipeImage.rejected, (state) => {
  //       state.status.createRecipeImage = REDUX_STATE.REJECTED
  //       LogHelper({ logType: 'error', message: 'An error occurred' })
  //       state.error = {}
  //     })
  //     .addCase(createRecipeImage.fulfilled, (state, action) => {
  //       if (!action?.payload?.recipeId) return
  //       state.status.createRecipeImage = REDUX_STATE.FULFILLED
  //       const recipes: Recipe[] = state.data.recipes.map((recipe: Recipe) => {
  //         if (recipe.id === action.payload.recipeId) {
  //           return {
  //             ...recipe,
  //             images: recipe?.images?.length ? [...recipe.images, action.payload] : [action.payload],
  //           }
  //         }
  //         return recipe
  //       })
  //       state.data.recipes = recipes
  //       state.error = {}
  //     })

  //     .addCase(deleteRecipeImage.pending, (state) => {
  //       state.status.deleteRecipeImage = REDUX_STATE.LOADING
  //       state.error = {}
  //     })
  //     .addCase(deleteRecipeImage.rejected, (state) => {
  //       state.status.deleteRecipeImage = REDUX_STATE.REJECTED
  //       LogHelper({ logType: 'error', message: 'An error occurred' })
  //       state.error = {}
  //     })
  //     .addCase(deleteRecipeImage.fulfilled, (state, _action) => {
  //       state.status.deleteRecipeImage = REDUX_STATE.FULFILLED
  //       state.error = {}
  //     })
  // },
})

export const {} = recipeSlice.actions

export default recipeSlice.reducer
