import { createSlice } from '@reduxjs/toolkit'
import User from '../../../types/User'
import UserState from '../../../types/UserState'

import { initiateAuth0Thunk } from './thunks/userAuthentication'

export const initialState = {
  data: {
    user: {
      name: 'initial',
    } as User,
  },
}

export const initAuth0 = initiateAuth0Thunk

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    storeToken: (state: UserState, action) => {
      state.data.user.token = action.payload
    },
    storeUser: (state: UserState, action) => {
      const user = { token: state.data.user.token, ...action.payload }
      state.data.user = user
    },
  },
  extraReducers: {
    // [fetchRecipes.pending]: (state, action) => {
    //   state.status.fetchRecipes = "loading";
    //   state.error = {};
    // },
    // [fetchRecipes.rejected]: (state, action) => {
    //   state.status.fetchRecipes = "loading";
    //   state.error = {};
    // },
    // [fetchRecipes.fulfilled]: (state, action) => {
    //   state.data.recipes = action.payload.recipes;
    //   state.status.fetchRecipes = "fulfilled";
    //   state.error = {};
    // },
  },
})

export const { storeToken, storeUser } = userSlice.actions
export default userSlice.reducer
