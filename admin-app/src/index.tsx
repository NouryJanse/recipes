import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './styles/index.scss'
import GlobalStyle from './styles/globalStyle'

import { store } from './redux/store'
import Auth from './pages/Auth'
import Fonts from './styles/fonts'

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
