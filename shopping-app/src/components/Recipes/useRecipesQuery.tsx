import { useEffect, useRef, useState } from "preact/hooks";
import { fetchRecipes } from "../../services/api/fetchRecipes";

const useRecipesQuery = (serverRecipes: Recipe[]) => {
  const [actualRecipes, setActualRecipes] = useState<Recipe[]>(serverRecipes);
  const [recipeFilter, setRecipeFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const hasRendered = useRef(false);

  useEffect(() => {
    //@TODO ADD A LITTLE DEBOUNCE!!
    triggerFetch();
  }, [recipeFilter]);

  const triggerFetch = async () => {
    if (hasRendered.current) {
      setIsLoading(true);
      const data = await fetchRecipes(recipeFilter);
      setActualRecipes(data);
      setIsLoading(false);
    }
    hasRendered.current = true;
  };

  return { isLoading, actualRecipes, recipeFilter, setRecipeFilter };
};

export default useRecipesQuery;
