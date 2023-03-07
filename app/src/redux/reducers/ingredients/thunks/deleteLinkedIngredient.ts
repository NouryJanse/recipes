import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import RootState from '../../../../types/RootState'

async function deleteLinkedIngredientAPI(data: { id: number; authorId: string }, token: string): Promise<Ingredient> {
  const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/ingredients/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const deleteLinkedIngredientThunk = createAsyncThunk('ingredients/deleteIngredient', async (id: number, thunkApi) => {
  const state = thunkApi.getState() as RootState
  const user = state.userSlice?.data?.user
  const response = await deleteLinkedIngredientAPI({ id, authorId: user.sub }, user.token)
  return response
})

export default deleteLinkedIngredientThunk
