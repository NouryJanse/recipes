import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        //...,
        //...,
    },
});

export const { /* ... */ } = recipesSlice.actions;

export default recipesSlice.reducer;