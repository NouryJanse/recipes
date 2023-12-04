import React, { ReactElement } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { Loader, PageTitle, RecipeCard } from '../../../components'
import { useGetRecipesQuery } from '../../../redux/reducers/recipes/recipes'

const Recipes: React.FC = (): ReactElement | null => {
  const params = useParams()
  const { data: recipes, isLoading } = useGetRecipesQuery()

  if (!recipes || (recipes && recipes?.length < 1)) {
    return null
  }

  return (
    <div className="pt-7">
      <div>{isLoading && <Loader />}</div>

      {!params.recipeId ? (
        <div>
          <PageTitle text={`${recipes.length} delicous meals`} />

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recipes.map((recipe: Recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
            })}
          </div>
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default Recipes
