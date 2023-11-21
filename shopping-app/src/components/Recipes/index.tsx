import type { FunctionComponent } from "preact";
import RecipeCard from "../RecipeCard";

type RecipesProps = {
  recipes: any[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ recipes }) => {
  return (
    <div className="container">
      <h2>Recipes</h2>

      <div className="row">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe: any) => {
            return (
              <RecipeCard recipe={recipe} withEditButton={false} withRemovalButton={false} />
              // <a
              //   href={`recipes/${recipe.id}`}
              //   className="col-3"
              //   style={{
              //     backgroundImage: recipe.images[0].url,
              //     // boxShadow: !isHovering
              //     //   ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"
              //     //   : "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
              //   }}
              // >
              //   {/* <img
              //     src={recipe.images && recipe.images.length && recipe?.images[0]?.url ? recipe.images[0].url : ""}
              //     alt={recipe.name}
              //   /> */}
              // </a>
            );
          })
        ) : (
          <p>Unfortunately, there are no recipes yet...</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
