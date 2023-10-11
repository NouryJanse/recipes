import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { IoChevronBackOutline } from 'react-icons/io5'

import RecipeContainer from './styled'
import { deleteRecipe, getRecipes } from '../../../redux/reducers/recipes/recipeSlice'
import { Button } from '../../../components/index'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import REPLACEMENT_IMAGES from '../../../constants/REPLACEMENT_IMAGES'

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

      <div className="flex flex-row justify-between items-center">
        <Link to="/recipes" className="flex items-center mr-4">
          <IoChevronBackOutline />
          Back to Recipes
        </Link>
        <div className="flex flex-row">
          <Link to={`/recipes/${recipe.id}/edit`}>
            <Button type="button" label="Edit" buttonStyle="secondary" classes="mr-2" />
          </Link>

          <Button type="button" label="Delete" onClick={(): Promise<boolean> => onDelete(recipe.id)} />
        </div>
      </div>
    </RecipeContainer>
  )
}

export default RecipeDetail