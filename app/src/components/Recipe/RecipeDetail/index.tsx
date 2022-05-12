import { deleteRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import { RecipeContainer } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '../../index'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import { useEffect, useState } from 'react'

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let params = useParams()
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)

  useEffect(() => {
    if (params.recipeId !== undefined) {
      let localRecipe = recipes.find((recipe) => {
        return recipe.id === Number.parseInt(params.recipeId!)
      })
      if (localRecipe) setRecipe(localRecipe as Recipe)
    }
  }, [params.recipeId])

  const onDelete = async (recipeId: number) => {
    if (!recipeId) return
    // @ts-ignore:next-line
    await dispatch(deleteRecipe(recipeId))
    navigate('/recipes')
  }

  if (!recipe) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer>
      <h2>{recipe.name}</h2>
      {recipe.updatedAt && <p>Last updated: {formatNLDateTime(recipe.updatedAt)}</p>}
      {recipe.createdAt && <p>Created at: {formatNLDateTime(recipe.createdAt)}</p>}
      {recipe.description && <p>{recipe.description}</p>}
      <i>{recipe.course}</i>
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
      <Button type="button" label={'Delete'} onClick={() => onDelete(recipe.id)} />
      <Link to={`/recipes`}>Back to Recipes</Link>
    </RecipeContainer>
  )
}

export default RecipeDetail
