import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function createRecipeAPI(data, token) {
  const response = await axios.post(
    "http://localhost:1337/api/recipes",
    {
      name: data.title,
      description: data.description,
      id: data.id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export const createRecipeThunk = createAsyncThunk(
  "recipes/createRecipe",
  async (data, state) => {
    const user = state.getState()?.userSlice?.data?.user;
    const response = await createRecipeAPI(
      { ...data, id: user.sub },
      user.token
    );
    return response;
  }
);
