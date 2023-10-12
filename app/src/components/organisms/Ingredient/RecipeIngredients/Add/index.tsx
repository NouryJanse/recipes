import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../../../index'
import RootState from '../../../../../types/RootState'
import { getIngredients, createLinkedIngredient } from '../../../../../redux/reducers/ingredients/ingredientSlice'
import { INGREDIENT_UNITS } from '../../../../../constants'
import { getRecipe } from '../../../../../redux/reducers/recipes/recipeSlice'
import { useForm } from 'react-hook-form'

type AddRecipeIngredientProps = { recipe: Recipe }

type Inputs = {
  id: number
  ingredient: string
  unit: number
  amount: number
  name: string
}

const AddRecipeIngredient: React.FC<AddRecipeIngredientProps> = ({ recipe }): ReactElement => {
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
    if (!ingredients || ingredients?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getIngredients())
    } else {
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
  }, [dispatch, ingredients])

  const dispatchEdit = async (data: Inputs): Promise<boolean> => {
    reset() // clear the rest of the form
    clearAutoComplete() // clear the Autocomplete field (separate from form since its custom)
    setUnit('')

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
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSubmit = (data) => {
    dispatchEdit(data)
  }

  if (!options) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <FieldContainer>
          <AutoComplete
            labelText="Search for an ingredient*"
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
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            name="unit"
            label="Unit*"
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
            // errors={errors.unit}
          />
        </FieldContainer>

        <FieldContainer classes="mb-8">
          <Number
            name="amount"
            label="Amount*"
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
            // errors={errors.amount}
          />
        </FieldContainer>

        <Button type="submit" label="Add ingredient" />
      </form>
    </div>
  )
}

export default AddRecipeIngredient
