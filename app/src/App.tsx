import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import Navigation from './components/organisms/Navigation'
import RecipesList from './components/pages/RecipesList'
import CreateRecipe from './components/pages/CreateRecipe'
import EditRecipe from './components/pages/EditRecipe'
import { RecipeDetail } from './components'
import RootState from './types/RootState'
import ROUTES from './constants/ROUTES'
import Dashboard from './components/pages/Dashboard'
import Ingredients from './components/pages/Ingredients'
import CreateIngredient from './components/pages/CreateIngredient'
import Ratings from './components/pages/Ratings'
import Account from './components/pages/Account'

type AppProps = {
  logout: () => void
}

const App: React.FC<AppProps> = ({ logout }): ReactElement => {
  const application = useSelector((state: RootState) => state.applicationSlice.data)

  return (
    <div className="flex flex-row">
      <Navigation logout={logout} />

      <div
        className={classNames(
          { 'ml-64': application.navMenuIsOpened, 'ml-16': !application.navMenuIsOpened },
          'content p-3  w-full',
        )}
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<Dashboard />} />

          <Route path={ROUTES.RECIPES_CREATE} element={<CreateRecipe />} />

          <Route path="/recipes" element={<RecipesList />}>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <p>No recipes data available, probably the API endpoint is down.</p>
                </main>
              }
            />
            <Route path=":recipeId" element={<RecipeDetail />} />
            <Route path=":recipeId/edit" element={<EditRecipe />} />
          </Route>

          <Route path={ROUTES.INGREDIENTS} element={<Ingredients />} />
          <Route path={ROUTES.INGREDIENTS_CREATE} element={<CreateIngredient />} />
          <Route path={ROUTES.RATINGS} element={<Ratings />} />
          <Route path={ROUTES.ACCOUNT} element={<Account />} />

          <Route path="*" element={`<p>There's nothing here!</p>`} />
        </Routes>
      </div>
    </div>
  )
}

export default App
