const RECIPES_API_URL = import.meta.env.PUBLIC_RECIPES_API_URL

const fetchWithTimeout = async (resource: string, options = { timeout: 0 }) => {
    const { timeout = 8000 } = options
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
    })
    clearTimeout(id)
    return response
}

const fetchRecipes = async (recipeFilter: string): Promise<Recipe[]> => {
    try {
        if (RECIPES_API_URL) {
            const params = `${recipeFilter.length ? `/filter/${recipeFilter}` : '/'}`
            const recipesJSON = await fetchWithTimeout(`${RECIPES_API_URL}/api/recipes${params}`, {
                timeout: 750,
            })

            if (recipesJSON.status === 200) {
                return await recipesJSON.json()
            } else {
                return []
            }
        }
    } catch (error: unknown) {
        console.log(error)

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error('Abort Error - API fetch timeout')
            }
        }
    }
    return []
}

export { fetchRecipes }
