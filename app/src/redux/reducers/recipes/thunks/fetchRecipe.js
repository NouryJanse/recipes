import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

async function fetchRecipeAPI() {
  const response = await axios.get("http://localhost:1337/api/recipes");
  return response.data;
}

export const fetchRecipeThunk = createAsyncThunk(
  "recipes/fetchRecipe",
  async (data) => {
    const response = await fetchRecipeAPI();
    return response;
  }
);
