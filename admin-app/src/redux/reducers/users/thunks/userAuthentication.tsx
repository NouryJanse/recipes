import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js'
import LogHelper from '../../../../helpers/LogHelper'

const domain: string = import.meta.env.VITE_APP_AUTH0_DOMAIN as string
const clientId: string = import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string
const audience: string = import.meta.env.VITE_APP_AUTH0_AUDIENCE as string
const scope: string = import.meta.env.VITE_APP_AUTH0_SCOPE as string

const initAuth0API = async (): Promise<Auth0Client | false> => {
  try {
    return await createAuth0Client({
      domain,
      clientId,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        audience,
        scope,
      },
    })
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

const initiateAuth0Thunk = createAsyncThunk('users/initAuth0', async () => {
  const response = await initAuth0API()
  return response
})

export default initiateAuth0Thunk