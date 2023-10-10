import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import {
  Navigation,
  Recipes,
  CreateRecipe,
  EditRecipe,
  RecipeDetail,
  IngredientDetail,
  Dashboard,
  Ingredients,
  CreateIngredient,
  Ratings,
  Account,
  EditIngredient,
} from './components'
import RootState from './types/RootState'
import ROUTES from './constants/ROUTES'

const App: React.FC = (): ReactElement => {
  const application = useSelector((state: RootState) => state.applicationSlice.data)

  return (
    <div className="flex flex-row">
      <Navigation />

      <div
        className={classNames(
          { 'ml-64': application.navMenuIsOpened, 'ml-16': !application.navMenuIsOpened },
          'content p-3  w-full',
        )}
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<Dashboard />} />

          <Route path={ROUTES.RECIPES_CREATE} element={<CreateRecipe />} />

          <Route path="/recipes" element={<Recipes />}>
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

          <Route path={ROUTES.INGREDIENTS} element={<Ingredients />}>
            <Route path=":ingredientId" element={<IngredientDetail />} />
            <Route path=":ingredientId/edit" element={<EditIngredient />} />
          </Route>
          <Route path={ROUTES.INGREDIENTS_CREATE} element={<CreateIngredient />} />
          <Route path={ROUTES.RATINGS} element={<Ratings />} />
          <Route path={ROUTES.ACCOUNT} element={<Account />} />

          <Route path="*" element={`There's nothing here!`} />
        </Routes>
      </div>
    </div>
  )
}

export default App
