import type { FunctionalComponent } from "preact";
import RecipeCard from "../RecipeCard";

type RecipeListProps = {
  isLoading: boolean;
  actualRecipes: Recipe[];
};

const RecipeList: FunctionalComponent<RecipeListProps> = ({ isLoading, actualRecipes }) => {
  if (isLoading) return <>Loading...</>;
  return (
    <div>
      {!isLoading && actualRecipes && actualRecipes.length > 0 ? (
        actualRecipes.map((recipe: any) => {
          return <RecipeCard recipe={recipe} withEditButton={false} withRemovalButton={false} />;
        })
      ) : (
        <p>Unfortunately, there are no recipes yet...</p>
      )}
    </div>
  );
};

export default RecipeList;
