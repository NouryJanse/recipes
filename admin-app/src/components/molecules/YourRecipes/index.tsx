import React, { ReactElement } from 'react'
import compareDateForSorting from '../../../helpers/compareDateForSorting'
import RootState from '../../../types/RootState'
import { useSelector } from 'react-redux'
import RecipeCard from '../../organisms/Recipe/RecipeCard'

type YourRecipesProps = {}

const YourRecipes: React.FC<YourRecipesProps> = ({}): ReactElement => {
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  return (
    <div>
      <div className="flex mb-4">
        <h2 className="text-md xl:text-3xl font-semibold">Your recipes</h2>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {[...recipes]
          .sort((a: Recipe, b: Recipe) => compareDateForSorting(a.createdAt, b.createdAt))
          .slice(4, 7)
          .map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
          })}
      </div>
    </div>
  )
}

export default YourRecipes
