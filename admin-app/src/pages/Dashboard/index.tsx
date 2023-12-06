import React from 'react'
import { useSelector } from 'react-redux'

import RootState from '../../types/RootState'
import { useGetRecipesQuery } from '../../redux/reducers/recipes/recipes'
import REPLACEMENT_IMAGES from '../../constants/REPLACEMENT_IMAGES'

import { PageTitle } from '../../components'
import Hero from '../../components/molecules/Hero'
import SuggestedRecipes from '../../components/molecules/SuggestedRecipes'
import YourRecipes from '../../components/molecules/YourRecipes'

const Dashboard: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const { data: recipes } = useGetRecipesQuery()

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
