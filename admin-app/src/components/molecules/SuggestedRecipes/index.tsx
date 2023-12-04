import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../atoms/Icon'
import { HiArrowSmRight } from 'react-icons/hi'
import compareDateForSorting from '../../../helpers/compareDateForSorting'
import RecipeCard from '../../organisms/Recipe/RecipeCard'
import RootState from '../../../types/RootState'
import { useSelector } from 'react-redux'

type SuggestedRecipesProps = {}

const SuggestedRecipes: React.FC<SuggestedRecipesProps> = ({}): ReactElement => {
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md xl:text-3xl font-semibold">Suggested recipes for you</h2>

        <Link
          className="flex text-sm xl:text-lg font-semibold mb-0 mr-4 items-center hover:mr-6 transition-all"
          to="/recipes"
        >
          <span className="hidden lg:flex leading-6">See all</span>

          <Icon iconElement={<HiArrowSmRight style={{ color: 'black', margin: '' }} />} />
        </Link>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {[...recipes]
          .sort((a: Recipe, b: Recipe) => compareDateForSorting(a.createdAt, b.createdAt))
          .slice(0, 3)
          .map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
          })}
      </div>
    </div>
  )
}

export default SuggestedRecipes
