import type { FunctionalComponent } from "preact";
import RecipeCard from "../RecipeCard";

type RecipeListProps = {
  isLoading: boolean;
  actualRecipes: Recipe[];
};

const RecipeList: FunctionalComponent<RecipeListProps> = ({ isLoading, actualRecipes }) => {
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {!isLoading && actualRecipes && actualRecipes.length > 0 ? (
        actualRecipes.map((recipe: any) => {
          return <RecipeCard recipe={recipe} withEditButton={false} withRemovalButton={false} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeList;
