import { deleteRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import { RecipeContainer } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../index'
import { formatNLDateTime } from '../../../helpers/DateHelper'
import RootState from '../../../types/RootState'
import { useState, useEffect } from 'react'
import ImageComponent from '../../Image'
import { Image } from '../../../types/Image'

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const [mainImage, setMainImage] = useState({} as Image)

  const onDelete = async (recipeId: number) => {
    if (!recipeId) return
    // @ts-ignore:next-line
    await dispatch(deleteRecipe(recipeId))
    navigate('/recipes')
  }

  useEffect(() => {
    if (recipe?.images?.length) {
      setMainImage(recipe.images[0])
    }
  }, [recipe, recipes])

  if (!recipe) return <p>Error, no recipe found.</p>

  return (
    <RecipeContainer>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:flex-1">
          <h2 className="font-bold">
            {recipe.name} - <i>{recipe.course}</i>
          </h2>
          {recipe.updatedAt && <p>Last updated at {formatNLDateTime(`${recipe.updatedAt}`)}</p>}
          {recipe.createdAt && <p>Created at at {formatNLDateTime(recipe.createdAt)}</p>}
          {recipe.description && <p>{recipe.description}</p>}
        </div>
        <div className="md:flex-1">{mainImage && <ImageComponent src={mainImage.url} />}</div>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          label="Detail"
          onClick={() => {
            navigate(`/recipes/${recipe.id}`)
          }}
          buttonStyle="secondary"
        ></Button>
        <Button
          type="button"
          label="Edit"
          onClick={() => {
            navigate(`/recipes/${recipe.id}/edit`)
          }}
          buttonStyle="secondary"
        ></Button>
        <Button
          type="button"
          label={'Delete'}
          onClick={() => onDelete(recipe.id)}
          buttonStyle="primary"
        />
      </div>
    </RecipeContainer>
  )
}

export default RecipeCard
