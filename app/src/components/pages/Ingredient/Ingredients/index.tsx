import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { Loader, IngredientCard, IngredientsTable } from '../../..'

import { getIngredients } from '../../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../../types/RootState'
// import { Loader, RecipeCard } from '../..'
import { REDUX_STATE } from '../../../../constants'

const Ingredients: React.FC = (): ReactElement | null => {
  const dispatch = useDispatch()
  const ingredients: Ingredient[] = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const status = useSelector((state: RootState) => state.ingredientSlice.status)
  const params = useParams()

  useEffect(() => {
    if (!ingredients || ingredients?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getIngredients())
    }
  }, [dispatch, ingredients])

  // Should be styled and moved into a component in the Ingredient subfolder
  if (status.getIngredients === REDUX_STATE.REJECTED) {
    return <span>Error in fetching the ingredients.</span>
  }

  if (ingredients?.length < 1) {
    return null
  }

  return (
    <div>
      <div className="mb-16">{status.getIngredients === REDUX_STATE.LOADING && <Loader />}</div>

      {!params.ingredientId && ingredients?.length ? (
        <div>
          <h1 className="text-xl md:text-3xl xl:text-4xl font-bold mb-20">{ingredients.length} tasty ingredients</h1>

          <IngredientsTable ingredients={ingredients} />
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default Ingredients
