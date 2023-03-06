import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../index'
import RootState from '../../../types/RootState'
import { getIngredients, linkIngredientToRecipe } from '../../../redux/reducers/ingredients/ingredientSlice'
import { INGREDIENT_UNITS } from '../../../constants'
import { getRecipe } from '../../../redux/reducers/recipes/recipeSlice'

type RecipesIngredientsProps = { recipe: Recipe }

const RecipesIngredients: React.FC<RecipesIngredientsProps> = ({ recipe }): ReactElement => {
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
  } = useForm()

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

  const dispatchEdit = async (ingredient: Ingredient): Promise<boolean> => {
    reset() // clear the rest of the form
    clearAutoComplete() // clear the Autocomplete field (separate from form since its custom)
    setUnit('')

    const obj = {
      authorId: user.sub,
      recipeId: recipe.id,
      ingredientId: ingredient.id,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }

    // @ts-ignore:next-line
    await dispatch(linkIngredientToRecipe(obj))
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipe.id))
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    dispatchEdit(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSave)} className="mb-6">
        <FieldContainer>
          <AutoComplete
            labelText="Search for an ingredient*"
            name="ingredient"
            options={options}
            handleOnChange={(option: Option | null): void => {
              if (option && option.value) {
                setValue('id', option.id)
              }
            }}
            setRef={setRef}
            errors={{ message: '', type: '' }}
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
            register={register}
            errors={errors.unit}
            options={INGREDIENT_UNITS}
          />
        </FieldContainer>

        <FieldContainer>
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
            register={register}
            errors={errors.amount}
          />
        </FieldContainer>

        <Button type="submit" label="Add ingredient" />
      </form>
    </div>
  )
}

export default RecipesIngredients
