import { createAsyncThunk } from "@reduxjs/toolkit";

async function postRecipeAPI(data) {
  const response = await fetch('http://127.0.0.1:1337/recipe', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  return response.json();
}

export const saveRecipeThunk = createAsyncThunk(
    'recipes/saveRecipe',
    async (data) => {
      const response = await postRecipeAPI(data);
      return response;
    }
)