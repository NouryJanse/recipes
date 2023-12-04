import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = `${import.meta.env.VITE_SERVER_URL}/api`

export const ingredientsAPI = createApi({
  reducerPath: 'ingredientsAPI',
  tagTypes: ['Ingredient'],
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    createIngredient: builder.mutation<Ingredient, Ingredient>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/ingredients`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Ingredient', id: 'LIST' }],
    }),
    createLinkedIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    deleteIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    deleteLinkedIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    getIngredient: builder.query<Ingredient, number>({
      query: (id) => `/ingredients/${id}`,
    }),
    getIngredients: builder.query<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    updateIngredient: builder.mutation<void, Pick<Ingredient, 'id'> & Partial<Ingredient>>({
      query({ id, ...patch }) {
        return {
          url: `ingredrients/${id}`,
          method: 'PUT',
          body: patch,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Ingredient', id }],
    }),
    updateLinkedIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
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
