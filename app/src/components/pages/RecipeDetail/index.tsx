import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { IoChevronBackOutline } from 'react-icons/io5'

import RecipeContainer from './styled'
import { deleteRecipe, getRecipes } from '../../../redux/reducers/recipes/recipeSlice'
import { Button } from '../../index'
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
          backgroundImage: recipe.images
            ? `url('${recipe.images[0].url}')`
            : `url('${REPLACEMENT_IMAGES.recipeCard}')`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.18)',
        }}
        className="relative mb-16 bg-cover bg-no-repeat bg-center overflow-hidden"
      >
        <h1 className="text-xl xl:text-4xl font-bold pt-32 pb-32 pl-10 text-white">
          {recipe.name}
        </h1>
      </div>

      {recipe.updatedAt && <p>Last updated: {formatNLDateTime(recipe.updatedAt)}</p>}
      {recipe.createdAt && <p>Created at: {formatNLDateTime(recipe.createdAt)}</p>}

      {recipe.description && <p>{recipe.description}</p>}

      <i>{recipe.course}</i>

      <Link to={`/recipes/${recipe.id}/edit`}>
        <Button type="button" label="Edit" buttonStyle="secondary" />
      </Link>

      <Button type="button" label="Delete" onClick={(): Promise<boolean> => onDelete(recipe.id)} />

      <Link to="/recipes" className="flex items-center">
        <IoChevronBackOutline />
        Back to Recipes
      </Link>
    </RecipeContainer>
  )
}

export default RecipeDetail
