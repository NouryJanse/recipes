import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  data: {
    navMenuIsOpened: false,
    appURL: import.meta.env.VITE_APP_PUBLIC_URL as string,
    serverURL: import.meta.env.VITE_APP_SERVER_URL as string,
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
  extraReducers: {},
})

export const { toggleNav } = applicationSlice.actions

export default applicationSlice.reducer