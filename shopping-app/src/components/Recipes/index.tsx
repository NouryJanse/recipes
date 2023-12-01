import type { FunctionComponent } from "preact";
import RecipeCard from "../RecipeCard";

type RecipesProps = {
  recipes: any[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ recipes }) => {
  return (
    <div className="recipe--cards">
      <h2>Recipes</h2>

      <div>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe: any) => {
            return <RecipeCard recipe={recipe} withEditButton={false} withRemovalButton={false} />;
          })
        ) : (
          <p>Unfortunately, there are no recipes yet...</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
