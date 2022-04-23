import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes } from '../../redux/reducers/recipes/recipeSlice'
import { Outlet, useParams } from 'react-router-dom'
import { useInterval } from '../../polling'
import Recipe from '../../types/Recipe'
import RootState from '../../types/RootState'

import { RecipeCard } from '../../components'

const RecipesList = () => {
  const dispatch = useDispatch()
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  let params = useParams()

  useEffect(() => {
    if (!recipes.length) {
      // @ts-ignore:next-line
      dispatch(getRecipes())
    }
  }, [dispatch, recipes])

  useInterval(() => {
    // @ts-ignore:next-line
    dispatch(getRecipes())
  }, 5000)

  return (
    <div>
      <div className="">
        {!params.recipeId ? (
          <div>
            {recipes.map((recipe: Recipe, i: number) => {
              return (
                // <Link key={i} to={`/recipes/${recipe.id}`}>
                <RecipeCard key={i} recipe={recipe} />
                // </Link>
              )
            })}
          </div>
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipesList
