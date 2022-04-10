import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import RecipesList from './RecipesList';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';
import { RecipeDetail } from '../components';
import { toggleNav } from '../redux/reducers/application/applicationSlice';

const Home = ({ user, logout }) => {
  const dispatch = useDispatch();
  const application = useSelector((state) => state.applicationSlice.data);

  return (
    <div className="rootContainer">
      <Navigation user={user} logout={logout} />

      <div className={`container content ${application.navMenuIsOpened ? `opened` : `closed`}`}>
        <div className="row">
          <div className="col-xs-12">
            <h1>Recipes by Noury</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Routes>
              <Route path="/" element={<div>Welcome!</div>} />

              <Route path="/create" element={<CreateRecipe />} />

              <Route path="/recipes" element={<RecipesList />}>
                <Route
                  index
                  element={
                    <main style={{ padding: '1rem' }}>
                      <p>Select an invoice</p>
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
  );
};

export default Home;
