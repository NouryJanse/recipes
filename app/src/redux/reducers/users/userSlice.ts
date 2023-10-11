import { createSlice } from '@reduxjs/toolkit'
import UserState from '../../../types/UserState'

import initiateAuth0Thunk from './thunks/userAuthentication'

export const initialState = {
  data: {
    user: {
      name: 'Noury',
      sub: '12345',
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
})

export const { storeToken, storeUser } = userSlice.actions
export default userSlice.reducer
