export const fetchRecipes = async (recipeFilter: string) => {
  try {
    const RECIPES_API_URL = import.meta.env.PUBLIC_RECIPES_API_URL;
    if (RECIPES_API_URL) {
      const recipesJSON = await fetch(
        `${RECIPES_API_URL}/api/recipes${recipeFilter.length ? `/filter/${recipeFilter}` : "/"}`
      );
      if (recipesJSON.status === 200) {
        return await recipesJSON.json();
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Abort Error - API fetch timeout");
      }
    }
  }
  return false;
};
