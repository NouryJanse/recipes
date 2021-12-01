import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipesAPI } from './recipesAPI';

const initialState = {
    data: {},
};

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
      const response = await fetchRecipesAPI();
      return response;
    }
  )

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        allItems: ( state, action = {} ) => {
            state.data = state.data;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.data = [...action.payload.recipes];
        })
    }
});

export const { allItems } = recipesSlice.actions;

export const selectWishlist = (state) => state.recipes.datas;

export default recipesSlice.reducer;