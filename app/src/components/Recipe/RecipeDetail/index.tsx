import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'

import RecipeContainer from './styled'
import { deleteRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import { Button } from '../../index'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import ImageComponent from '../../Image'

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
    navigate('/recipes')
    return true
  }

  if (!recipe) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer>
      <h2>{recipe.name}</h2>
      <div
        style={{ paddingBottom: '50vh', overflow: 'hidden', height: '50vh', position: 'relative' }}
      >
        {recipe.images && recipe.images.length ? (
          <ImageComponent alt="text" src={recipe.images[0].url} width="100%" height="100%" />
        ) : (
          ''
        )}
      </div>
      {recipe.updatedAt && <p>Last updated: {formatNLDateTime(recipe.updatedAt)}</p>}
      {recipe.createdAt && <p>Created at: {formatNLDateTime(recipe.createdAt)}</p>}
      {recipe.description && <p>{recipe.description}</p>}
      <i>{recipe.course}</i>
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
      <Button type="button" label="Delete" onClick={(): Promise<boolean> => onDelete(recipe.id)} />
      <Link to="/recipes">Back to Recipes</Link>
    </RecipeContainer>
  )
}

export default RecipeDetail
