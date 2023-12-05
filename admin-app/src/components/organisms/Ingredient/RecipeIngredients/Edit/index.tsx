import { ReactElement, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import RootState from '../../../../../types/RootState'
import { useUpdateLinkedIngredientMutation } from '../../../../../redux/reducers/ingredients/ingredients'
import Form from './form'

interface EditableIngredientListProps {
  ingredient: RecipeIngredient
  recipeId: number
}

const EditLinkedIngredient: React.FC<EditableIngredientListProps> = ({ ingredient, recipeId }): ReactElement => {
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const [updatedIngredient, setUpdatedIngredient] = useState<RecipeIngredient>()
  const [updateLinkedIngredient, {}] = useUpdateLinkedIngredientMutation()

  const dispatchEdit = async (localIngredient: RecipeIngredient): Promise<boolean> => {
    // @ts-ignore:next-line
    await updateLinkedIngredient(localIngredient)
    return true
  }

  const debouncedSubmit = useRef(
    debounce((localIngredient: RecipeIngredient) => {
      dispatchEdit(localIngredient)
    }, 500),
  ).current

  useEffect(() => {
    if (updatedIngredient) debouncedSubmit(updatedIngredient)
  }, [updatedIngredient])

  const updateIngredient = (name: string, value: number | string, linkedIngredient: RecipeIngredient): void => {
    setUpdatedIngredient({
      authorId: user.sub,
      recipeId,
      id: linkedIngredient.id,
      [name]: value,
    })
  }

  return <Form updateIngredient={updateIngredient} ingredient={ingredient} recipeId={recipeId} />
}

export default EditLinkedIngredient
