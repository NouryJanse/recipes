import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import RecipesList from './containers/RecipesList';
import CreateRecipe from './containers/CreateRecipe';
import { Recipe } from './components';

import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <h1>Recipes by Noury</h1>
        </div>
      </div>
      <div className="row">
          <RecipesList />

        <div className="col-xs-12 col-sm-6">
          <nav>
            <Link to="/create">Create</Link>
            <Link to="/recipes">Update</Link>
          </nav>
          <Routes>
            <Route path="/" element={<RecipesList/>} />

            <Route path="/create" element={<CreateRecipe />} />

            <Route path="/recipes" element={<RecipesList />}>
              <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                  </main>
                }
              />              
              <Route path=":recipeId" element={<Recipe />} />
            </Route>

            <Route
              path="*"
              element={
                <p>There's nothing here!</p>
              }
            />            
          </Routes>          
        </div>
      </div>
    </div>
  );
}

export default App;
