import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { Loader, IngredientsTable, PageTitle } from '../../../components'

import { getIngredients } from '../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../types/RootState'
import { REDUX_STATE } from '../../../constants'

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
    <div className="pt-7">
      <div>{status.getIngredients === REDUX_STATE.LOADING && <Loader />}</div>

      {!params.ingredientId && ingredients?.length ? (
        <div>
          <PageTitle text={`${ingredients.length} tasty ingredients`} />
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
