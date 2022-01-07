import { Routes, Route, Link } from "react-router-dom";
import RecipesList from "./RecipesList";
import CreateRecipe from "./CreateRecipe";
import EditRecipe from "./EditRecipe";
import { Recipe, Button } from "../components";

const Home = ({ user, logout }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <h1>Recipes by Noury</h1>
        </div>
      </div>

      <div className="row">
        <nav>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/recipes">
            <p>Recipes</p>
          </Link>
          <Link to="/create">
            <p>Create new recipe</p>
          </Link>
          <div>
            <p>{user.email}</p>
            Hello {user.name}{" "}
            <Button onClick={() => logout()} label="Log out" />
          </div>
        </nav>

        <div className="col-xs-12">
          <Routes>
            <Route path="/" element={<div>Welcome!</div>} />

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

            <Route path="*" element={<p>There's nothing here!</p>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
