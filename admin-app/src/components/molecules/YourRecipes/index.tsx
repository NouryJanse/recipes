import React, { ReactElement } from 'react'
import compareDateForSorting from '../../../helpers/compareDateForSorting'
import RecipeCard from '../../organisms/Recipe/RecipeCard'
import { useGetRecipesQuery } from '../../../redux/reducers/recipes/recipes'

const YourRecipes = ({}): ReactElement => {
    const { data: recipes } = useGetRecipesQuery()
    return (
        <div>
            {!!recipes?.length && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-md xl:text-3xl font-semibold">Your recipes</h2>
                    </div>

                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {getRecipesForYourRecipes([...recipes]).map((recipe: Recipe) => {
                            return (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    withEditButton
                                    withRemovalButton
                                />
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

const getRecipesForYourRecipes = (recipes: Recipe[]) => {
    return recipes
        .sort((a: Recipe, b: Recipe) => compareDateForSorting(a.createdAt, b.createdAt))
        .slice(4, 7)
}

export default YourRecipes
