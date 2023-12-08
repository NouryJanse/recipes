import { createSlice } from '@reduxjs/toolkit'
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

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    resetCreateIngredientStatus: (state) => {
      state.status.createIngredient = REDUX_STATE.INITIAL
    },
  },
})

export const { resetCreateIngredientStatus } = ingredientSlice.actions

export default ingredientSlice.reducer
