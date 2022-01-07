import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

async function fetchRecipesAPI() {
  const response = await axios.get("http://localhost:1337/api/recipes");
  return response.data;
}

export const fetchRecipesThunk = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await fetchRecipesAPI();
    return response;
  }
);
