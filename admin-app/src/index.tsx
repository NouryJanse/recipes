import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

import GlobalStyle from './styles/globalStyle'
import Fonts from './styles/fonts'
import App from './App'

const redirectURI: string = import.meta.env.VITE_APP_AUTH0_REDIRECT_URI as string
const domain: string = import.meta.env.VITE_APP_AUTH0_DOMAIN as string
const clientId: string = import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string
const audience: string = import.meta.env.VITE_APP_AUTH0_AUDIENCE as string
const scope: string = import.meta.env.VITE_APP_AUTH0_SCOPE as string

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container!)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Fonts />
        <App />
      </BrowserRouter>
    </Provider>,
  )
}
