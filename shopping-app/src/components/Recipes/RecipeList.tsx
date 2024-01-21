import type { FunctionalComponent } from "preact";
import RecipeCard from "./RecipeCard";

type RecipeListProps = {
  actualRecipes: Recipe[];
};

const RecipeList: FunctionalComponent<RecipeListProps> = ({ actualRecipes }) => {
  return (
    <div>
      {actualRecipes && actualRecipes.length > 0 ? (
        actualRecipes.slice(0, 12).map((recipe: any) => {
          return <RecipeCard recipe={recipe} withEditButton={false} withRemovalButton={false} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeList;
