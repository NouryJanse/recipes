import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../../../index'
import RootState from '../../../../../types/RootState'
import { getIngredients, createLinkedIngredient } from '../../../../../redux/reducers/ingredients/ingredientSlice'
import { INGREDIENT_UNITS } from '../../../../../constants'
import { getRecipe } from '../../../../../redux/reducers/recipes/recipeSlice'
import { useForm } from 'react-hook-form'

type AddRecipeIngredientProps = { recipe: Recipe; setShowAdd: React.Dispatch<React.SetStateAction<boolean>> }

type Inputs = {
  id: number
  ingredient: string
  unit: number
  amount: number
  name: string
}

const AddRecipeIngredient: React.FC<AddRecipeIngredientProps> = ({ recipe, setShowAdd }): ReactElement => {
  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()
  const [options, setOptions] = useState<Option[]>()
  const [ref, setRef] = useState<StateManagedSelect>()
  const [unit, setUnit] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>()

  const clearAutoComplete = (): void => {
    if (ref !== null) {
      // @ts-ignore:next-line
      ref.clearValue()
    }
  }

  useEffect(() => {
    if (ingredients && ingredients.length) {
      setOptions(
        ingredients.map((ingredient: Ingredient): Option => {
          return {
            id: ingredient.id,
            disabled: false,
            value: ingredient.id ? ingredient.id.toString() : '',
            label: ingredient.name ? ingredient.name : '',
          }
        }),
      )
    }
  }, [ingredients])

  const dispatchEdit = async (data: Inputs): Promise<boolean> => {
    if (!data.id && !data.name) return false // when a new ingredient is added
    if (!data.unit || !data.amount) return false // when an existing ingredient is added

    reset() // clear the rest of the form
    clearAutoComplete() // clear the Autocomplete field (separate from form since its custom)
    setUnit('') // empty the unit field

    const obj = {
      authorId: user.sub,
      recipeId: recipe.id,
      ingredientId: data.id,
      amount: data.amount,
      unit: data.unit,
      name: data.name,
    }

    // @ts-ignore:next-line
    await dispatch(createLinkedIngredient(obj))
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipe.id))
    // @ts-ignore:next-line
    await dispatch(getIngredients())
    setShowAdd(false)
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line */
  const onSubmit = (data) => {
    dispatchEdit(data)
  }

  if (!options) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-end mb-4">
        <AutoComplete
          labelText="Ingredient"
          name="ingredient"
          options={options}
          handleOnChange={(option: Option | null): void => {
            if (option && !option.id) {
              setValue('name', option.value)
            }
            if (option && option.value) {
              setValue('id', option.id)
            }
          }}
          setRef={setRef}
          errors={{ message: '', type: '' }}
          isCreatable={true}
          classes="mr-4"
          placeholder="Pick a new ingredient"
        />

        <Number
          name="amount"
          label="Amount"
          placeholder="Enter the amount of the ingredient"
          validation={{
            required: 'Did you forget to enter the amount?',
            min: {
              value: 1,
              message: 'Minimal 1',
            },
            valueAsNumber: true,
          }}
          register={() => register('amount')}
          classes="mr-4"
          // errors={errors.amount}
        />

        <Dropdown
          name="unit"
          label="Unit"
          defaultValue={unit}
          disabled={false}
          onChange={(changedUnit: ChangeEvent<HTMLInputElement>): void => {
            setUnit(changedUnit.target.value)
          }}
          validation={{
            required: 'Did you forget to fill in the unit of your ingredient?',
          }}
          register={() => register('unit')}
          options={INGREDIENT_UNITS}
          classes="mr-4"
          // errors={errors.unit}
        />

        <Button type="submit" label="Add" />
      </form>
    </div>
  )
}

export default AddRecipeIngredient
