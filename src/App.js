import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import RecipesList from './containers/RecipesList';
import CreateRecipe from './containers/CreateRecipe';
import EditRecipe from './containers/EditRecipe';
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
        <nav>
          <Link to="/"><p>Home</p></Link>
          <Link to="/create"><p>Create new recipe</p></Link>
        </nav>        
        <div className="col-xs-12">
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
              <Route path=":recipeId/edit" element={<EditRecipe />} />
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
