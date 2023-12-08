import { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

import RootState from '../../../../../types/RootState'

import { useCreateLinkedIngredientMutation } from '../../../../../redux/reducers/ingredients/ingredients'
import { useGetRecipeQuery } from '../../../../../redux/reducers/recipes/recipes'

import Form from './form'

type AddRecipeIngredientProps = { recipe: Recipe; setShowAdd: React.Dispatch<React.SetStateAction<boolean>> }

type Inputs = {
  id: number
  ingredient: string
  unit: number
  amount: number
  name: string
}

const AddRecipeIngredient: React.FC<AddRecipeIngredientProps> = ({ recipe, setShowAdd }): ReactElement => {
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const [ref, setRef] = useState<StateManagedSelect>()
  const [unit, setUnit] = useState<string>('')
  const [createLinkedIngredient] = useCreateLinkedIngredientMutation()
  const { refetch } = useGetRecipeQuery(recipe.id)

  const { register, handleSubmit, setValue, reset } = useForm<Inputs>()

  const clearAutoComplete = (): void => {
    if (ref !== null) {
      // @ts-ignore:next-line
      ref.clearValue()
    }
  }

  const dispatchEdit = async (data: Inputs): Promise<boolean> => {
    if (!data.id && !data.name) return false // when a new ingredient is added
    if (!data.unit || !data.amount) return false // when an existing ingredient is added

    reset() // clear the rest of the form
    clearAutoComplete() // clear the Autocomplete field (separate from form since its custom)
    setUnit('') // empty the unit field

    const obj = {
      authorId: 1,
      recipeId: recipe.id,
      ingredientId: data.id,
      amount: data.amount,
      unit: data.unit,
      name: data.name,
    }

    // @ts-ignore:next-line
    createLinkedIngredient(obj)
    refetch()
    setShowAdd(false)
    return true
  }

  /* eslint-disable-next-line */
  const onSubmit = (data) => {
    dispatchEdit(data)
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
      setRef={setRef}
      register={register}
      unit={unit}
      setUnit={setUnit}
    />
  )
}

export default AddRecipeIngredient
