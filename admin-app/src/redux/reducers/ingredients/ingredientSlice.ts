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
