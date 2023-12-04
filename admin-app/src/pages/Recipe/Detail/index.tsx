import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'

import RecipeContainer from './styled'
import { deleteRecipe, getRecipes } from '../../../redux/reducers/recipes/recipeSlice'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import REPLACEMENT_IMAGES from '../../../constants/REPLACEMENT_IMAGES'
import Navigation from './navigation'

const RecipeDetail: React.FC = (): ReactElement => {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)

  useEffect(() => {
    if (params.recipeId !== undefined) {
      const localRecipe = recipes.find((currentRecipe) => {
        return currentRecipe.id === Number(params.recipeId!)
      })
      if (localRecipe) setRecipe(localRecipe as Recipe)
    }
  }, [params.recipeId, recipes])

  const onDelete = async (recipeId: number): Promise<boolean> => {
    if (!recipeId) return false
    // @ts-ignore:next-line
    await dispatch(deleteRecipe(recipeId))
    // @ts-ignore:next-line
    await dispatch(getRecipes())
    navigate('/recipes')
    return true
  }

  if (!recipe.id) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer>
      <div
        style={{
          backgroundImage:
            recipe.images && recipe.images.length
              ? `url('${recipe.images[0].url}')`
              : `url('${REPLACEMENT_IMAGES.recipeCard}')`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.18)',
        }}
        className="relative mb-16 bg-cover bg-no-repeat bg-center overflow-hidden"
      >
        <h1 className="text-xl xl:text-4xl font-bold pt-32 pb-32 pl-10 text-white">{recipe.name}</h1>
      </div>

      <div className="mb-4">
        {recipe.updatedAt && <p>Updated: {formatNLDateTime(recipe.updatedAt)}</p>}
        {recipe.createdAt && <p>Created: {formatNLDateTime(recipe.createdAt)}</p>}
      </div>

      {recipe.description && <p className="mb-4">{recipe.description}</p>}

      <i className="block mb-4">{recipe.course}</i>

      <Navigation recipe={recipe} onDelete={onDelete} />
    </RecipeContainer>
  )
}

export default RecipeDetail
