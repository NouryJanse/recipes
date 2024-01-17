import type { FunctionComponent } from "preact";
import useRecipesQuery from "./useRecipesQuery";
import InputText from "../Form/InputText";
import RecipeList from "./RecipeList";
import { RecipeModal } from "..";

type RecipesProps = {
  serverRecipes: Recipe[];
};

const Recipes: FunctionComponent<RecipesProps> = ({ serverRecipes }) => {
  const { actualRecipes, recipeFilter, setRecipeFilter, isLoading, isError } = useRecipesQuery(serverRecipes);

  if (isError) return <div className="recipe--cards-status">Error. The server might be down. Please refresh.</div>;
  if (isLoading && recipeFilter === "") return <div className="recipe--cards-status">Loading...</div>;

  return (
    <>
      <RecipeModal />
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

        <RecipeList actualRecipes={actualRecipes} />
      </div>
    </>
  );
};

export default Recipes;
