import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = `${import.meta.env.VITE_SERVER_URL}/api`

export const ingredientsAPI = createApi({
  reducerPath: 'ingredientsAPI',
  tagTypes: ['Ingredient'],
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => `/ingredients`,
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
      invalidatesTags: ['Ingredient'],
    }),
    createLinkedIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    deleteIngredient: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/ingredients/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Ingredient'],
    }),
    deleteLinkedIngredient: builder.mutation<Ingredient[], void>({
      query: () => `/ingredients`,
    }),
    getIngredient: builder.query<Ingredient, number>({
      query: (id) => `/ingredients/${id}`,
    }),
    updateIngredient: builder.mutation<void, Pick<Ingredient, 'id'> & Partial<Ingredient>>({
      query({ id, ...patch }) {
        console.log(patch)

        return {
          url: `ingredients/${id}`,
          method: 'PUT',
          body: patch,
        }
      },
      invalidatesTags: ['Ingredient'],
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
