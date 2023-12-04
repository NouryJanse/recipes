import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = `${import.meta.env.VITE_SERVER_URL}/api`

export const recipesAPI = createApi({
  reducerPath: 'recipesAPI',
  tagTypes: ['Recipe'],
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    createRecipe: builder.mutation<Recipe, Recipe>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/recipes`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
    createRecipeImage: builder.mutation<any, any>({
      query: () => ``,
    }),
    deleteRecipe: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/recipes/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),
    deleteRecipeImage: builder.mutation<any, any>({
      query: () => ``,
    }),
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
    getRecipes: builder.query<Recipe[], void>({
      query: () => `/recipes`,
    }),
    updateRecipe: builder.mutation<void, Pick<Recipe, 'id'> & Partial<Recipe>>({
      query({ id, ...patch }) {
        return {
          url: `recipes/${id}`,
          method: 'PUT',
          body: patch,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Recipe', id }],
    }),
  }),
})

export const {
  useCreateRecipeMutation,
  useCreateRecipeImageMutation,
  useDeleteRecipeMutation,
  useDeleteRecipeImageMutation,
  useGetRecipeQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} = recipesAPI
