import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

async function updateRecipeAPI(data, token) {
  const response = await axios.put(
    `http://localhost:1337/api/recipes/${data.id}`,
    {
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      course: data.course,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
  return response.data;
}

export const updateRecipeThunk = createAsyncThunk('recipes/updateRecipe', async (data, state) => {
  const user = state.getState()?.userSlice?.data?.user;
  const response = await updateRecipeAPI({ ...data, authorId: user.sub }, user.token);
  return response;
});
