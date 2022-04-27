import { deleteRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import { RecipeContainer } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '../../index'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'

const RecipeCard = (data: any) => {
  let recipe = data.recipe
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let params = useParams()
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)

  if (params.recipeId && recipes) {
    recipe = recipes.find((recipe) => {
      return recipe.id === Number.parseInt(params.recipeId!)
    })
  }

  const onDelete = async (recipeId: number) => {
    if (!recipeId) return
    // @ts-ignore:next-line
    await dispatch(deleteRecipe(recipeId))
    navigate('/recipes')
  }

  if (!recipe) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer>
      <h2>
        {recipe.name} - <i>{recipe.course}</i>
      </h2>
      <p>Last updated: {formatNLDateTime(recipe.updatedAt)}</p>
      <p>Created at: {formatNLDateTime(recipe.createdAt)}</p>
      {recipe.description && <p>{recipe.description}</p>}
      <Link to={`/recipes/${recipe.id}`}>Detail</Link>
      <Button label={'Delete'} onClick={() => onDelete(recipe.id)} />
    </RecipeContainer>
  )
}

export default RecipeCard
