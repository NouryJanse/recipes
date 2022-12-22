import { createSlice } from '@reduxjs/toolkit'
import createIngredientThunk from './thunks/createIngredient'
import { REDUX_STATE } from '../../../constants'
import LogHelper from '../../../helpers/LogHelper'

export const initialState = {
  data: { ingredients: [] as Ingredient[] },
  status: {
    createIngredient: 'initial',
  },
  error: {},
}

export const createIngredient = createIngredientThunk

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // resetCreateRecipeStatus: (state) => {
    //   state.status.createRecipe = REDUX_STATE.INITIAL
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createIngredient.pending, (state) => {
      state.status.createIngredient = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(createIngredient.rejected, (state) => {
      state.status.createIngredient = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(createIngredient.fulfilled, (state) => {
      state.status.createIngredient = REDUX_STATE.FULFILLED
      state.error = {}
    })

    // builder.addCase(getRecipe.pending, (state) => {
    //   state.status.getRecipe = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(getRecipe.rejected, (state) => {
    //   state.status.getRecipe = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(getRecipe.fulfilled, (state, action) => {
    //   // eslint-disable-next-line prefer-destructuring
    //   const recipes: Recipe[] = state.data.recipes
    //   if (action?.payload) {
    //     const updatedRecipe: Recipe = action.payload as Recipe
    //     state.data.recipes = replaceRecipeWithIdInArrayWithRecipes(recipes, updatedRecipe)
    //   }
    //   state.status.getRecipe = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // builder.addCase(updateRecipe.pending, (state) => {
    //   state.status.updateRecipe = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(updateRecipe.rejected, (state) => {
    //   state.status.updateRecipe = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(updateRecipe.fulfilled, (state, action) => {
    //   state.status.updateRecipe = REDUX_STATE.FULFILLED
    //   // eslint-disable-next-line prefer-destructuring
    //   const recipes: Recipe[] = state.data.recipes
    //   if (action?.payload) {
    //     const updatedRecipe: Recipe = action.payload
    //     state.data.recipes = replaceRecipeWithIdInArrayWithRecipes(recipes, updatedRecipe)
    //   }
    //   state.error = {}
    // })

    // builder.addCase(createRecipeImage.pending, (state) => {
    //   state.status.createRecipeImage = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(createRecipeImage.rejected, (state) => {
    //   state.status.createRecipeImage = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(createRecipeImage.fulfilled, (state, action) => {
    //   if (!action?.payload?.recipeId) return
    //   state.status.createRecipeImage = REDUX_STATE.FULFILLED
    //   const recipes: Recipe[] = state.data.recipes.map((recipe: Recipe) => {
    //     if (recipe.id === action.payload.recipeId) {
    //       return {
    //         ...recipe,
    //         images: recipe?.images?.length ? [...recipe.images, action.payload] : [action.payload],
    //       }
    //     }
    //     return recipe
    //   })
    //   state.data.recipes = recipes
    //   state.error = {}
    // })

    // builder.addCase(deleteRecipeImage.pending, (state) => {
    //   state.status.deleteRecipeImage = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(deleteRecipeImage.rejected, (state) => {
    //   state.status.deleteRecipeImage = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(deleteRecipeImage.fulfilled, (state, _action) => {
    //   state.status.deleteRecipeImage = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // builder.addCase(createRecipe.pending, (state) => {
    //   state.status.createRecipe = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(createRecipe.rejected, (state) => {
    //   state.status.createRecipe = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(createRecipe.fulfilled, (state) => {
    //   state.status.createRecipe = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // builder.addCase(deleteRecipe.pending, (state) => {
    //   state.status.deleteRecipe = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // builder.addCase(deleteRecipe.rejected, (state) => {
    //   state.status.deleteRecipe = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // builder.addCase(deleteRecipe.fulfilled, (state) => {
    //   state.status.deleteRecipe = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })
  },
})

// export const { resetCreateRecipeStatus } = recipeSlice.actions

export default ingredientSlice.reducer
