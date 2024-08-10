import type { FunctionalComponent } from 'preact'
import RecipeCard from './RecipeCard'

type RecipeListProps = {
    actualRecipes: Recipe[]
    isLoading: boolean
}

const RecipeList: FunctionalComponent<RecipeListProps> = ({ actualRecipes, isLoading }) => {
    return (
        <div className="grid">
            {actualRecipes && !isLoading ? (
                actualRecipes.slice(0, 12).map((recipe: any) => {
                    return (
                        <RecipeCard
                            recipe={recipe}
                            withEditButton={false}
                            withRemovalButton={false}
                        />
                    )
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default RecipeList
