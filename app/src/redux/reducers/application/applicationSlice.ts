import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: {
    navMenuIsOpened: false,
    appURL: process.env.REACT_APP_PUBLIC_URL as string,
    serverURL: process.env.REACT_APP_SERVER_URL as string,
  },
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

export default applicationSlice.reducer
