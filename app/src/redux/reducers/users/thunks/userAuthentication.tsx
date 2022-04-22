import { createAsyncThunk } from '@reduxjs/toolkit'
import createAuth0Client from '@auth0/auth0-spa-js'

// const redirectURI: string = process.env.REACT_APP_AUTH0_REDIRECT_URI as string
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string
const scope: string = process.env.REACT_APP_AUTH0_SCOPE as string

async function initAuth0API() {
  try {
    return await createAuth0Client({
      domain,
      client_id: clientId,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      audience,
      scope,
    })
  } catch (error) {
    console.error(error)
  }
}

export const initiateAuth0Thunk = createAsyncThunk('users/initAuth0', async (_data) => {
  const response = await initAuth0API()
  return response
})
