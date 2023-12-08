import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = `${import.meta.env.VITE_SERVER_URL}/api`

export type data = {
  id: string
  token: string
}

export type user = {
  username: string
  password: string
}

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      // @ts-ignore:next-line
      const token = getState().userSlice.data.user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<data, user>({
      query(data) {
        const body = data
        return {
          url: `/users/login`,
          method: 'POST',
          body,
        }
      },
    }),
    validate: builder.mutation<{ authenticated: boolean }, { token: string }>({
      query(data) {
        const body = data
        return {
          url: `/users/validate`,
          method: 'POST',
          body,
        }
      },
    }),
    register: builder.mutation<any, user>({
      query(data) {
        const body = data
        return {
          url: `/users`,
          method: 'POST',
          body,
        }
      },
    }),
    // update
    // delete
  }),
})

export const { useLoginMutation, useValidateMutation, useRegisterMutation } = usersAPI
