import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { initialState as applicationState } from '../redux/reducers/application/applicationSlice'
import { initialState as ingredientState } from '../redux/reducers/ingredients/ingredientSlice'
import { initialState as userState } from '../redux/reducers/users/userSlice'
import { initialState as recipeState } from '../redux/reducers/recipes/recipeSlice'
import rootReducer from '../redux/rootSlice'
import RootState from '../types/RootState'

const renderWithStore = (
  ui: JSX.Element,
  {
    initialState = {
      applicationSlice: applicationState,
      ingredientSlice: ingredientState,
      userSlice: userState,
      recipeSlice: recipeState,
    },
    store = configureStore({ reducer: rootReducer }),
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    store?: Store<RootState>
  } = {},
): ReturnType<typeof render> => {
  const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export default renderWithStore
