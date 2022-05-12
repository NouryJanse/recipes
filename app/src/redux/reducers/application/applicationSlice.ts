import { createSlice } from '@reduxjs/toolkit'
import ApplicationState from '../../../types/ApplicationState'

export const initialState = {
  data: { navMenuIsOpened: false },
  status: {
    state: 'initial',
  },
}

export const applicationSlice = createSlice({
  name: 'applicationSlice',
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.data.navMenuIsOpened = !state.data.navMenuIsOpened
    },
  },
  extraReducers: {
    // [getRecipes.pending]: (state, action) => {
    //   state.status.getRecipes = 'loading';
    //   state.error = {};
    // },
    // [getRecipes.rejected]: (state, action) => {
    //   state.status.getRecipes = 'rejected';
    //   state.error = {};
    // },
    // [getRecipes.fulfilled]: (state, action) => {
    //   state.data.recipes = action.payload.recipes;
    //   state.status.getRecipes = 'fulfilled';
    //   state.error = {};
    // },
  },
})

export const { toggleNav } = applicationSlice.actions

export const selectApplication = (state: ApplicationState) => state.data

export default applicationSlice.reducer
