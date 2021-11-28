import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        users: [
            {
                "name": "Firstname lastname",
                "username": "user",
                "password": "password",
            },
            {
                "name": "Firstname lastname",
                "username": "leet",
                "password": "1337",
            },
        ]
    },
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        //...,
        //...,
    },
});

export const { /* ... */ } = userSlice.actions;

export default userSlice.reducer;