import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiArrowSmRight } from 'react-icons/hi'

import { Icon, RecipeCard } from '../../components'
import { getRecipes } from '../../redux/reducers/recipes/recipeSlice'
import RootState from '../../types/RootState'
import REPLACEMENT_IMAGES from '../../constants/REPLACEMENT_IMAGES'
import compareDate from '../../helpers/compareDate'

const Home: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.userSlice.data.user)
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!recipes || recipes?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getRecipes())
    }
  }, [dispatch, recipes])

  return (
    <>
      <span className="text-gray-600 mb-6 flex">Welcome {user.name}.</span>
      <h1 className="text-xl xl:text-4xl font-bold mb-20">Discover recipes</h1>
      <div
        style={{
          backgroundImage: `url('${REPLACEMENT_IMAGES.heroBanner}')`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
        }}
        className="p-10 md:p-20 mb-10 rounded-lg bg-cover"
      >
        <p className="text-white font-mono text-md xl:text-lg">Some hero component here...</p>
      </div>

      {!!recipes?.length && (
        <div>
          <div>
            <div className="flex align-center justify-between mb-4">
              <h2 className="text-md xl:text-3xl font-semibold">Suggested recipes for you</h2>
              <Link
                className="flex text-sm xl:text-lg font-semibold mb-0 leading-9 mr-4 align-center hover:mr-6 transition-all"
                to="/recipes"
              >
                <span className="hidden lg:flex">See all</span>
                <Icon iconElement={<HiArrowSmRight style={{ color: 'black', margin: '' }} />} />
              </Link>
            </div>

            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[...recipes]
                .sort((a: Recipe, b: Recipe) => compareDate(a.createdAt, b.createdAt))
                .slice(0, 3)
                .map((recipe: Recipe) => {
                  return (
                    <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
                  )
                })}
            </div>
          </div>

          <div>
            <div className="flex align-center justify-between mb-4">
              <h2 className="text-md xl:text-3xl font-semibold">Your recipes</h2>
            </div>

            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[...recipes]
                .sort((a: Recipe, b: Recipe) => compareDate(a.createdAt, b.createdAt))
                .slice(4, 7)
                .map((recipe: Recipe) => {
                  return (
                    <RecipeCard key={recipe.id} recipe={recipe} withEditButton withRemovalButton />
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
