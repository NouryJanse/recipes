import type { FunctionComponent } from "preact";
import RecipeCard from "../RecipeCard";
import useRecipesQuery from "./useRecipesQuery";
import InputText from "../Form/InputText";
import RecipeList from "./list";

type RecipesProps = {
  serverRecipes: Recipe[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ serverRecipes }) => {
  const { actualRecipes, recipeFilter, setRecipeFilter, isLoading } = useRecipesQuery(serverRecipes);

  return (
    <div className="recipe--cards">
      <div>
        <h2>Recipes</h2>

        <InputText
          placeholder="Enter filter query..."
          name="search"
          value={recipeFilter}
          onInput={(e: Event) => setRecipeFilter((e.target as HTMLInputElement).value)}
        />
      </div>

      <RecipeList isLoading={isLoading} actualRecipes={actualRecipes} />
    </div>
  );
};

export default Recipes;
