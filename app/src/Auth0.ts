import createAuth0Client, { Auth0Client, User } from '@auth0/auth0-spa-js'
import LogHelper from './helpers/LogHelper'

class Auth0 implements Auth0Interface {
  redirect_uri?: string

  scope?: string

  token?: string

  auth0Client?: Auth0Client

  user?: User | undefined

  error?: string

  isLoading?: boolean

  isAuthenticated?: boolean

  constructor(redirectURI = '', scope = '') {
    this.redirect_uri = redirectURI
    this.scope = scope
    this.token = undefined
    this.auth0Client = undefined
    this.user = undefined
    this.error = undefined
    this.isLoading = false
  }

  initiate = async ({
    domain,
    clientId,
    audience,
    scope,
  }: {
    domain: string
    clientId: string
    audience: string
    scope: string
  }): Promise<void> => {
    try {
      this.toggleIsloading(true)
      this.auth0Client = await createAuth0Client({
        domain,
        client_id: clientId,
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
        audience,
        scope,
      })
      await this.getTokenSilently()
      await this.getUser()
      this.toggleIsloading(false)
    } catch (error) {
      LogHelper({ logType: 'error', message: error as string })
    }
  }

  login = async (): Promise<User | false | undefined> => {
    try {
      this.toggleIsloading(true)

      if (!this.auth0Client) return false

      const login: User | false | undefined = await this.auth0Client
        .loginWithPopup({
          redirect_uri: 'http://localhost:3000/',
        })
        .then(async () => {
          // await this.getTokenSilently()
          this.getTokenSilently()
          // return await this.getUser()
          return this.getUser()
        })

      this.toggleIsloading(false)
      return login
    } catch (error) {
      LogHelper({ logType: 'error', message: error as string })
      return false
    }
  }

  getUser = async (): Promise<User | false | undefined> => {
    try {
      if (!this.auth0Client) return false
      this.user = await this.auth0Client.getUser()
      return this.user
    } catch (error) {
      LogHelper({ logType: 'error', message: error as string })
      return false
    }
  }

  logout = async (): Promise<boolean> => {
    try {
      if (!this.auth0Client) return false
      await this.auth0Client.logout({
        returnTo: 'http://localhost:3000/',
      })
      return true
    } catch (error) {
      LogHelper({ logType: 'error', message: error as string })
      return false
    }
  }

  getTokenSilently = async (): Promise<string | boolean> => {
    try {
      this.toggleIsloading(true)
      if (!this.auth0Client) return false
      this.token = await this.auth0Client.getTokenSilently({
        scope: 'read:current_user',
      })
      this.toggleIsloading(false)
      this.error = undefined
      return this.token
    } catch (error) {
      const TypedError = error as Error
      if (TypedError?.error !== 'login_required') {
        LogHelper({ logType: 'error', message: error as string })
        throw new Error(TypedError.error)
      } else {
        this.error = 'login_required'
      }
      return false
    }
  }

  toggleIsloading = (state = false): void => {
    this.isLoading = state
  }
}

export default Auth0
