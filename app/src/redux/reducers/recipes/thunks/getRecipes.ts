import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

async function getRecipesAPI() {
  const response = await axios.get("http://localhost:1337/api/recipes");
  return response.data;
}

export const getRecipesThunk = createAsyncThunk(
  "recipes/getRecipes",
  async () => {
    const response = await getRecipesAPI();
    return response;
  }
);
