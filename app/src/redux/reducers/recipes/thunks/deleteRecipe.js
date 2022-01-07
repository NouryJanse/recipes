import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

async function deleteRecipeAPI(data, token) {
  const response = await axios.delete(
    `http://localhost:1337/api/recipes/${data.id}`,
    {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export const deleteRecipeThunk = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, state) => {
    const user = state.getState()?.userSlice?.data?.user;
    const response = await deleteRecipeAPI(
      { id, authorId: user.sub },
      user.token
    );
    return response;
  }
);
