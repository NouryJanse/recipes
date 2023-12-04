import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { getRecipes } from '../../../redux/reducers/recipes/recipeSlice'
import RootState from '../../../types/RootState'
import { Loader, PageTitle, RecipeCard } from '../../../components'
import { REDUX_STATE } from '../../../constants'

const Recipes: React.FC = (): ReactElement | null => {
  const dispatch = useDispatch()
  const recipes: Recipe[] = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const params = useParams()

  useEffect(() => {
    if (!recipes || recipes?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getRecipes())
    }
  }, [])

  // Should be styled and moved into a component in the Recipe subfolder
  if (status.getRecipes === REDUX_STATE.REJECTED) {
    return <span>Error in fetching the recipes.</span>
  }

  if (recipes?.length < 1) {
    return null
  }

  return (
    <div className="pt-7">
      <div>{status.getRecipes === REDUX_STATE.LOADING && <Loader />}</div>

      {!params.recipeId && recipes?.length ? (
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
