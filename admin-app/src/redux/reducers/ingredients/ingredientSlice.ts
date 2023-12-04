import { createSlice } from '@reduxjs/toolkit'
import {
  createIngredientThunk,
  deleteIngredientThunk,
  getIngredientThunk,
  getIngredientsThunk,
  updateIngredientThunk,
  createLinkedIngredientThunk,
  updateRecipeIngredientThunk,
  deleteLinkedIngredientThunk,
} from './thunks'
import { REDUX_STATE } from '../../../constants'
// import LogHelper from '../../../helpers/LogHelper'
// import replaceIngredientWithIdInArrayWithIngredients from './helpers'

export const initialState = {
  data: { ingredients: [] as Ingredient[] },
  status: {
    createIngredient: 'initial',
    deleteIngredient: 'initial',
    getIngredient: 'initial',
    getIngredients: 'initial',
    updateIngredient: 'initial',
    createLinkedIngredient: 'initial',
    deleteLinkedIngredient: 'initial',
  },
  error: {},
}

export const createIngredient = createIngredientThunk
export const deleteIngredient = deleteIngredientThunk
export const getIngredient = getIngredientThunk
export const getIngredients = getIngredientsThunk
export const updateIngredient = updateIngredientThunk
export const createLinkedIngredient = createLinkedIngredientThunk
export const updateRecipeIngredient = updateRecipeIngredientThunk
export const deleteLinkedIngredient = deleteLinkedIngredientThunk

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    resetCreateIngredientStatus: (state) => {
      state.status.createIngredient = REDUX_STATE.INITIAL
    },
  },
  extraReducers: (builder) => {
    builder
    // .addCase(createIngredient.pending, (state) => {
    //   state.status.createIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(createIngredient.rejected, (state) => {
    //   state.status.createIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(createIngredient.fulfilled, (state) => {
    //   state.status.createIngredient = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // .addCase(getIngredient.pending, (state) => {
    //   state.status.getIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(getIngredient.rejected, (state) => {
    //   state.status.getIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(getIngredient.fulfilled, (state, action) => {
    //   // eslint-disable-next-line prefer-destructuring
    //   const ingredients: Ingredient[] = state.data.ingredients
    //   if (action?.payload) {
    //     const updatedIngredient: Ingredient = action.payload as unknown as Ingredient
    //     state.data.ingredients = [...ingredients, updatedIngredient]
    //   }
    //   state.status.getIngredient = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // .addCase(getIngredients.pending, (state) => {
    //   state.status.getIngredients = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(getIngredients.rejected, (state) => {
    //   state.status.getIngredients = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(getIngredients.fulfilled, (state, action) => {
    //   state.status.getIngredients = REDUX_STATE.FULFILLED
    //   if (action !== null && action.payload) {
    //     state.data.ingredients = action.payload
    //   }
    //   state.error = {}
    // })

    // .addCase(updateIngredient.pending, (state) => {
    //   state.status.updateIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(updateIngredient.rejected, (state) => {
    //   state.status.updateIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(updateIngredient.fulfilled, (state, action) => {
    //   state.status.updateIngredient = REDUX_STATE.FULFILLED
    //   // eslint-disable-next-line prefer-destructuring
    //   const ingredients: Ingredient[] = state.data.ingredients
    //   if (action?.payload) {
    //     const updatedIngredient: Ingredient = action.payload
    //     state.data.ingredients = replaceIngredientWithIdInArrayWithIngredients(ingredients, updatedIngredient)
    //   }
    //   state.error = {}
    // })

    // .addCase(deleteIngredient.pending, (state) => {
    //   state.status.deleteIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(deleteIngredient.rejected, (state) => {
    //   state.status.deleteIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(deleteIngredient.fulfilled, (state) => {
    //   state.status.deleteIngredient = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // .addCase(createLinkedIngredient.pending, (state) => {
    //   state.status.createLinkedIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(createLinkedIngredient.rejected, (state) => {
    //   state.status.createLinkedIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(createLinkedIngredient.fulfilled, (state) => {
    //   state.status.createLinkedIngredient = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })

    // .addCase(deleteLinkedIngredient.pending, (state) => {
    //   state.status.deleteLinkedIngredient = REDUX_STATE.LOADING
    //   state.error = {}
    // })
    // .addCase(deleteLinkedIngredient.rejected, (state) => {
    //   state.status.deleteLinkedIngredient = REDUX_STATE.REJECTED
    //   LogHelper({ logType: 'error', message: 'An error occurred' })
    //   state.error = {}
    // })
    // .addCase(deleteLinkedIngredient.fulfilled, (state) => {
    //   state.status.deleteLinkedIngredient = REDUX_STATE.FULFILLED
    //   state.error = {}
    // })
  },
})

export const { resetCreateIngredientStatus } = ingredientSlice.actions

export default ingredientSlice.reducer
