import { createSlice } from '@reduxjs/toolkit'

import { initiateAuth0Thunk } from './thunks/userAuthentication'

const initialState = {
  data: {
    users: [
      {
        name: 'Firstname lastname',
        username: 'user',
        password: 'password',
      },
      {
        name: 'Firstname lastname',
        username: 'leet',
        password: '1337',
      },
    ],
    user: {},
  },
}

export const initAuth0 = initiateAuth0Thunk

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeToken: (state: any, action) => {
      state.data.user.token = action.payload
    },
    storeUser: (state: any, action) => {
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

export const selectUsers = (state: any) => state.users.data

export default userSlice.reducer
