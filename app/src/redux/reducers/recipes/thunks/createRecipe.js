import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const fetchRecipe = async () => {
//   //   const response = await axios.post("http://localhost:1337/api/recipes", {
//   //     body: {
//   //       test: "test",
//   //       biem: "hoi",
//   //     },
//   //     headers: {
//   //       Authorization: "Bearer " + user.token,
//   //     },
//   //   });
//   //   console.log(response.data);
//   // };
// });

async function createRecipeAPI(data, token) {
  const response = await axios.post(
    "http://localhost:1337/api/recipes",
    {
      name: data.title,
      description: data.description,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  // const response = await fetch("http://127.0.0.1:1337/recipe", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });
  return response.json();
}

export const createRecipeThunk = createAsyncThunk(
  "recipes/createRecipe",
  async (data, state) => {
    const token = state.getState()?.userSlice?.data?.user?.token;
    const response = await createRecipeAPI(data, token);
    return response;
  }
);
