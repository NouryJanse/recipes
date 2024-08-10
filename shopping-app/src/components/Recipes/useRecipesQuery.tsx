import { useEffect, useRef, useState } from 'preact/hooks'
import { fetchRecipes } from '../../services/api/fetchRecipes'

const useRecipesQuery = (serverRecipes: Recipe[]) => {
    const [actualRecipes, setActualRecipes] = useState<Recipe[]>(serverRecipes)
    const [recipeFilter, setRecipeFilter] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(
        typeof serverRecipes === 'boolean' && !serverRecipes ? !serverRecipes : false,
    )
    const hasRendered = useRef(false)

    useEffect(() => {
        // TODO: add debounce
        triggerFetch()
    }, [recipeFilter])

    const triggerFetch = async () => {
        if (hasRendered.current) {
            setIsLoading(true)
            const data = await fetchRecipes(recipeFilter)

            if (data && Array.isArray(data)) {
                setActualRecipes(data)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setIsError(true)
            }
        }
        hasRendered.current = true
    }

    return { isLoading, isError, actualRecipes, recipeFilter, setRecipeFilter }
}

export default useRecipesQuery
