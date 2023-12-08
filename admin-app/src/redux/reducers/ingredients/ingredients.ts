import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = `${import.meta.env.VITE_SERVER_URL}/api`

export const ingredientsAPI = createApi({
  reducerPath: 'ingredientsAPI',
  tagTypes: ['Ingredients', 'Ingredient'],
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      // @ts-ignore:next-line
      const token = getState().userSlice.data.user.token
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => `/ingredients`,
      providesTags: ['Ingredients'],
    }),
    getIngredient: builder.query<Ingredient, number>({
      query: (id) => `/ingredients/${id}`,
      providesTags: ['Ingredient'],
    }),
    createIngredient: builder.mutation<Ingredient, Ingredient>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/ingredients`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Ingredient', 'Ingredients'],
    }),
    updateIngredient: builder.mutation<void, Pick<Ingredient, 'id'> & Partial<Ingredient>>({
      query({ id, ...patch }) {
        return {
          url: `ingredients/${id}`,
          method: 'PUT',
          body: patch,
        }
      },
      invalidatesTags: ['Ingredient', 'Ingredients'],
    }),
    deleteIngredient: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/ingredients/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Ingredient', 'Ingredients'],
    }),

    createLinkedIngredient: builder.mutation<Ingredient, Ingredient>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/ingredients/recipe`,
          method: 'POST',
          body,
        }
      },
    }),
    updateLinkedIngredient: builder.mutation<void, Pick<Ingredient, 'id'> & Partial<Ingredient>>({
      query({ id, ...patch }) {
        return {
          url: `/ingredients/recipe/${id}`,
          method: 'PUT',
          body: patch,
        }
      },
    }),
    deleteLinkedIngredient: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/ingredients/recipe/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {
  useCreateIngredientMutation,
  useCreateLinkedIngredientMutation,
  useDeleteIngredientMutation,
  useDeleteLinkedIngredientMutation,
  useGetIngredientQuery,
  useGetIngredientsQuery,
  useUpdateIngredientMutation,
  useUpdateLinkedIngredientMutation,
} = ingredientsAPI
