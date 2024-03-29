const fetchRecipes = async (recipeFilter: string): Promise<boolean | Recipe[]> => {
  try {
    const RECIPES_API_URL = import.meta.env.PUBLIC_RECIPES_API_URL;
    if (RECIPES_API_URL) {
      const recipesJSON = await fetchWithTimeout(
        `${RECIPES_API_URL}/api/recipes${recipeFilter.length ? `/filter/${recipeFilter}` : "/"}`,
        { timeout: 750 }
      );

      if (recipesJSON.status === 200) {
        return await recipesJSON.json();
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Abort Error - API fetch timeout");
        return false;
      }
    }
  }
  return false;
};

const fetchWithTimeout = async (resource: string, options = { timeout: 0 }) => {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export { fetchRecipes };
