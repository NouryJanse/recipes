import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js'

interface Auth0 {
  redirect_uri: string
  scope: string
  token?: string
  auth0Client?: Auth0Client
  user?: object
  error?: string
  isLoading: boolean
}

class Auth0 {
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
  }) => {
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
      return
    } catch (error) {
      console.error(error)
    }
  }

  login = async () => {
    try {
      this.toggleIsloading(true)

      if (!this.auth0Client) return

      const login = await this.auth0Client
        .loginWithPopup({
          redirect_uri: 'http://localhost:3000/',
        })
        .then(async () => {
          await this.getTokenSilently()
          return await this.getUser()
        })

      this.toggleIsloading(false)
      return login
    } catch (error) {
      console.error(error)
    }
  }

  getUser = async () => {
    try {
      if (!this.auth0Client) return
      this.user = await this.auth0Client.getUser()
      return this.user
    } catch (error) {
      console.error(error)
    }
  }

  logout = async () => {
    try {
      if (!this.auth0Client) return
      await this.auth0Client.logout({
        returnTo: 'http://localhost:3000/',
      })
    } catch (error) {
      console.error(error)
    }
  }

  getTokenSilently = async () => {
    try {
      this.toggleIsloading(true)
      if (!this.auth0Client) return
      this.token = await this.auth0Client.getTokenSilently({
        scope: 'read:current_user',
      })
      this.toggleIsloading(false)
      return this.token
    } catch (error: any) {
      if (error?.error !== 'login_required') {
        console.error(error)
        throw new Error(error)
      } else {
        this.error = 'login_required'
      }
    }
  }

  toggleIsloading = (state = false) => {
    this.isLoading = state
  }
}

export default Auth0
