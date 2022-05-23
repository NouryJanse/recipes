import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navigation from './containers/Navigation'
import RecipesList from './containers/RecipesList'
import CreateRecipe from './containers/CreateRecipe'
import EditRecipe from './containers/EditRecipe'
import { RecipeDetail } from './components'
import RootState from './types/RootState'
import ROUTES from './constants/ROUTES'
import Home from './containers/Home'

type HomeProps = {
  logout: () => void
}

const App: React.FC<HomeProps> = ({ logout }): ReactElement => {
  const application = useSelector((state: RootState) => state.applicationSlice.data)

  return (
    <div className="rootContainer">
      <Navigation logout={logout} />

      <div className={`container content ${application.navMenuIsOpened ? `opened` : `closed`}`}>
        <div className="">
          <div className="">
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />

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

              <Route path="*" element={`<p>There's nothing here!</p>`} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
