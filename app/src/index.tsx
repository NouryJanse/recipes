import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
// import { GlobalStyle } from './styles/globalStyle'
// import { GlobalFonts } from './styles/fonts'
import App from './App'
import Auth0 from './Auth0'
import { CacheLocation } from '@auth0/auth0-spa-js'

const redirectURI: string = process.env.REACT_APP_AUTH0_REDIRECT_URI as string
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE as string
const cacheLocation: CacheLocation = process.env.REACT_APP_AUTH0_LOCATION as CacheLocation
const scope: string = process.env.REACT_APP_AUTH0_SCOPE as string

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)

  const auth0 = new Auth0(redirectURI, scope)
  auth0
    .initiate({
      domain,
      clientId,
      audience,
      scope,
    })
    .then(() => {
      root.render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              {/* <GlobalStyle /> */}
              {/* <GlobalFonts /> */}
              <App auth0={auth0} />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>,
      )
    })
}