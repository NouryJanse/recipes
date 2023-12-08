import React, { ReactElement, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import RootState from './types/RootState'
import ROUTES from './constants/ROUTES'

import {
  Navigation,
  Recipes,
  CreateRecipe,
  EditRecipe,
  RecipeDetail,
  Dashboard,
  Ingredients,
  CreateIngredient,
  Ratings,
  Account,
  EditIngredient,
} from './components'

type AppProps = {
  onUserLogout: () => void
}

const App: React.FC<AppProps> = ({ onUserLogout }): ReactElement => {
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  const navBar = clsx('content p-4  w-full', {
    'ml-64': application.navMenuIsOpened,
    'ml-16': !application.navMenuIsOpened,
  })

  useEffect(() => {
    const animatedEls = document.querySelectorAll('.appFadeIn')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.contains('appFadeIn') ? entry.target.classList.add('reveal') : ''
          }
        })
      },
      { threshold: 0.1 },
    )

    for (let i = 0; i < animatedEls.length; i++) {
      const elements = animatedEls[i]
      observer.observe(elements)
    }
  }, [])

  return (
    <div className="flex flex-row appFadeIn">
      <Navigation onUserLogout={onUserLogout} />

      <div className={navBar}>
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
            <Route path=":ingredientId/edit" element={<EditIngredient />} />
          </Route>
          <Route path={ROUTES.INGREDIENTS_CREATE} element={<CreateIngredient />} />
          <Route path={ROUTES.RATINGS} element={<Ratings />} />
          <Route path={ROUTES.ACCOUNT} element={<Account />} />

          <Route path="*" element={`Oops, there is nothing here...`} />
        </Routes>
      </div>
    </div>
  )
}

export default App
