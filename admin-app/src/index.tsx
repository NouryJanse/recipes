import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

import GlobalStyle from './styles/globalStyle'
import './styles/index.scss'

import Fonts from './styles/fonts'
import Auth from './Auth'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container!)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Fonts />
        <Auth />
      </BrowserRouter>
    </Provider>,
  )
}
