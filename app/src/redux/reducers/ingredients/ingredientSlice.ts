import { createSlice } from '@reduxjs/toolkit'
import {
  createIngredientThunk,
  deleteIngredientThunk,
  getIngredientThunk,
  getIngredientsThunk,
  updateIngredientThunk,
  linkIngredientToRecipeThunk,
} from './thunks'
import { REDUX_STATE } from '../../../constants'
import LogHelper from '../../../helpers/LogHelper'
import replaceIngredientWithIdInArrayWithIngredients from './helpers'

export const initialState = {
  data: { ingredients: [] as Ingredient[] },
  status: {
    createIngredient: 'initial',
    deleteIngredient: 'initial',
    getIngredient: 'initial',
    getIngredients: 'initial',
    updateIngredient: 'initial',
    linkIngredientToRecipe: 'initial',
  },
  error: {},
}

export const createIngredient = createIngredientThunk
export const deleteIngredient = deleteIngredientThunk
export const getIngredient = getIngredientThunk
export const getIngredients = getIngredientsThunk
export const updateIngredient = updateIngredientThunk
export const linkIngredientToRecipe = linkIngredientToRecipeThunk

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    resetCreateIngredientStatus: (state) => {
      state.status.createIngredient = REDUX_STATE.INITIAL
    },
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

    builder.addCase(getIngredient.pending, (state) => {
      state.status.getIngredient = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getIngredient.rejected, (state) => {
      state.status.getIngredient = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(getIngredient.fulfilled, (state, action) => {
      // eslint-disable-next-line prefer-destructuring
      const ingredients: Ingredient[] = state.data.ingredients
      if (action?.payload) {
        const updatedIngredient: Ingredient = action.payload as unknown as Ingredient
        state.data.ingredients = [...ingredients, updatedIngredient]
      }
      state.status.getIngredient = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(getIngredients.pending, (state) => {
      state.status.getIngredients = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(getIngredients.rejected, (state) => {
      state.status.getIngredients = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.status.getIngredients = REDUX_STATE.FULFILLED
      if (action !== null && action.payload) {
        state.data.ingredients = action.payload
      }
      state.error = {}
    })

    builder.addCase(updateIngredient.pending, (state) => {
      state.status.updateIngredient = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(updateIngredient.rejected, (state) => {
      state.status.updateIngredient = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(updateIngredient.fulfilled, (state, action) => {
      state.status.updateIngredient = REDUX_STATE.FULFILLED
      // eslint-disable-next-line prefer-destructuring
      const ingredients: Ingredient[] = state.data.ingredients
      if (action?.payload) {
        const updatedIngredient: Ingredient = action.payload
        state.data.ingredients = replaceIngredientWithIdInArrayWithIngredients(ingredients, updatedIngredient)
      }
      state.error = {}
    })

    builder.addCase(deleteIngredient.pending, (state) => {
      state.status.deleteIngredient = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(deleteIngredient.rejected, (state) => {
      state.status.deleteIngredient = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(deleteIngredient.fulfilled, (state) => {
      state.status.deleteIngredient = REDUX_STATE.FULFILLED
      state.error = {}
    })

    builder.addCase(linkIngredientToRecipe.pending, (state) => {
      state.status.linkIngredientToRecipe = REDUX_STATE.LOADING
      state.error = {}
    })
    builder.addCase(linkIngredientToRecipe.rejected, (state) => {
      state.status.linkIngredientToRecipe = REDUX_STATE.REJECTED
      LogHelper({ logType: 'error', message: 'An error occurred' })
      state.error = {}
    })
    builder.addCase(linkIngredientToRecipe.fulfilled, (state) => {
      state.status.linkIngredientToRecipe = REDUX_STATE.FULFILLED
      state.error = {}
    })
  },
})

export const { resetCreateIngredientStatus } = ingredientSlice.actions

export default ingredientSlice.reducer
