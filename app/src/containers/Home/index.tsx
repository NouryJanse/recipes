import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from '../Navigation'
import RecipesList from '../RecipesList'
import CreateRecipe from '../CreateRecipe'
import EditRecipe from '../EditRecipe/'
import { RecipeDetail } from '../../components'
import RootState from '../../types/RootState'

const Home = ({ logout }: any) => {
  const application = useSelector((state: RootState) => state.applicationSlice.data)
  const user = useSelector((state: RootState) => state.userSlice.data.user)

  return (
    <div className="rootContainer">
      <Navigation user={user} logout={logout} />

      <div className={`container content ${application.navMenuIsOpened ? `opened` : `closed`}`}>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="underline mb-4 xs:text-sm md:text-xl">Recipes by Noury</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Routes>
              <Route path="/" element={<div>Welcome {user.name}!</div>} />

              <Route path="/create" element={<CreateRecipe />} />

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

              <Route path="*" element={<p>There's nothing here!</p>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
