import { createSlice } from '@reduxjs/toolkit'
import UserState from '../../../types/UserState'

const user: User = {
    name: '',
    id: '',
    token: '',
}

export const initialState = {
    data: {
        user,
    },
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        storeToken: (state: UserState, action) => {
            state.data.user.token = action.payload
        },
        storeUser: (state: UserState, action) => {
            state.data.user = action.payload
        },
        clearUser: (state: UserState) => {
            state.data.user = user
        },
    },
})

export const { storeToken, storeUser, clearUser } = userSlice.actions
export default userSlice.reducer
