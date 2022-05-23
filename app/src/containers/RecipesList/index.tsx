import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { getRecipes } from '../../redux/reducers/recipes/recipeSlice'
import RootState from '../../types/RootState'
import { Loader, RecipeCard } from '../../components'
import { REDUX_STATE } from '../../constants'
// import useInterval from '../../polling'

const RecipesList: React.FC = (): ReactElement | null => {
  const dispatch = useDispatch()
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const params = useParams()

  useEffect(() => {
    if (!recipes || recipes?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getRecipes())
    }
  }, [dispatch, recipes])

  // useInterval(() => {
  //   // @ts-ignore:next-line
  //   dispatch(getRecipes())
  // }, 5000)

  if (recipes?.length < 1) return null

  return (
    <div className="pt-12">
      <h1 className="text-xl xl:text-4xl font-bold mb-20">{recipes.length} delicous meals</h1>

      <div>{status.getRecipes === REDUX_STATE.LOADING && <Loader />}</div>

      {!params.recipeId && recipes?.length ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recipes.map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
          })}
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default RecipesList
