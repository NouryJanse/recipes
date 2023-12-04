import React, { ReactElement } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Loader, IngredientsTable, PageTitle } from '../../../components'
import { useGetIngredientsQuery } from '../../../redux/reducers/ingredients/ingredients'

const Ingredients: React.FC = (): ReactElement | null => {
  const params = useParams()
  const { data: ingredients, isLoading } = useGetIngredientsQuery()

  if (!ingredients || (ingredients && ingredients?.length < 1)) {
    return null
  }

  return (
    <div className="pt-7">
      <div>{isLoading && <Loader />}</div>

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
