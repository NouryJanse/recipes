import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { initialState as recipeState } from '../redux/reducers/recipes/recipeSlice'
import { initialState as userState } from '../redux/reducers/users/userSlice'
import { initialState as applicationState } from '../redux/reducers/application/applicationSlice'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from '../redux/rootSlice'
import RootState from '../types/RootState'
import { ReactNode } from 'react'

export const renderWithStore = (
  ui: JSX.Element,
  {
    initialState = {
      recipeSlice: recipeState,
      userSlice: userState,
      applicationSlice: applicationState,
    },
    store = configureStore({ reducer: rootReducer }),
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    store?: Store<RootState>
  } = {},
): ReturnType<typeof render> => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
