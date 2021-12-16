import { createAsyncThunk } from "@reduxjs/toolkit";

async function fetchRecipesAPI(userID = 1) {
  const response = await fetch('/data/recipes.json');
  return response.json();
}

export const fetchRecipesThunk = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
      const response = await fetchRecipesAPI();
      return response;
    }
)