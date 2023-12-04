import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PageTitle } from '../../components'
import { getRecipes } from '../../redux/reducers/recipes/recipeSlice'
import RootState from '../../types/RootState'
import REPLACEMENT_IMAGES from '../../constants/REPLACEMENT_IMAGES'
import Hero from '../../components/molecules/Hero'
import SuggestedRecipes from '../../components/molecules/SuggestedRecipes'
import YourRecipes from '../../components/molecules/YourRecipes'

const Dashboard: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore:next-line
    if (!recipes || recipes?.length < 1) dispatch(getRecipes())
  }, [])

  return (
    <div className="pt-7">
      <span className="text-gray-600 mb-6 flex">Welcome {user.name}.</span>
      <PageTitle text="Discover recipes" />
      <Hero image={REPLACEMENT_IMAGES} />

      {!!recipes?.length && (
        <>
          <SuggestedRecipes />
          <YourRecipes />
        </>
      )}
    </div>
  )
}

export default Dashboard
