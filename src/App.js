import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import RecipesList from './containers/RecipesList';
import CreateRecipe from './containers/CreateRecipe';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <h1>Recipes by Noury</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <RecipesList />
        </div>
        <div className="col-xs-12 col-sm-6">
          <CreateRecipe />
        </div>
      </div>
    </div>
  );
}

export default App;
