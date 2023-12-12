import { useEffect, useState } from "preact/hooks";
import { fetchRecipes } from "./fetchRecipes";

const useRecipesQuery = (serverRecipes: Recipe[]) => {
  const [actualRecipes, setActualRecipes] = useState<Recipe[]>(serverRecipes);
  const [recipeFilter, setRecipeFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ADD DEBOUNCE!!
    triggerFetch();
  }, [recipeFilter]);

  const triggerFetch = async () => {
    setIsLoading(true);
    const data = await fetchRecipes(recipeFilter);
    setActualRecipes(data);
    setIsLoading(false);
  };

  return { isLoading, actualRecipes, recipeFilter, setRecipeFilter };
};

export default useRecipesQuery;
