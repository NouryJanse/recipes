import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../index'
import RootState from '../../../types/RootState'
import { getIngredients, linkIngredientToRecipe } from '../../../redux/reducers/ingredients/ingredientSlice'
import { INGREDIENT_UNITS } from '../../../constants'

type RecipesIngredientsProps = { recipe: Recipe }

const RecipesIngredients: React.FC<RecipesIngredientsProps> = ({ recipe }): ReactElement => {
  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()
  const [options, setOptions] = useState<Option[]>()
  const [ref, setRef] = useState<StateManagedSelect>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()

  // console.log(errors)

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

  const dispatchEdit = async (data: Ingredient): Promise<boolean> => {
    /* eslint-disable no-console */
    console.log(data)
    /* eslint-enable no-console */

    clearAutoComplete()
    reset()

    // const obj = {
    //   authorId: user.sub,
    //   recipeId: recipe.id,
    //   ingredientId: Number(data.ingredientName),
    //   amount: 50,
    //   unit: 'gr',
    // }
    // // @ts-ignore:next-line
    // await dispatch(linkIngredientToRecipe(obj))
    // // @ts-ignore:next-line
    // await dispatch(getRecipe(recipeId))
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    dispatchEdit(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FieldContainer>
        <AutoComplete
          labelText="Search for an ingredient*"
          name="ingredient"
          errors={errors.ingredient}
          options={options}
          handleOnChange={(option: Option | null): void => {
            if (option && option.value) {
              setValue('ingredientName', option.value)
            }
          }}
          setRef={setRef}
        />
      </FieldContainer>

      <FieldContainer>
        <Dropdown
          name="unit"
          label="Unit*"
          defaultValue=""
          disabled={false}
          onChange={(unit: ChangeEvent): void => {
            setValue('unit', unit)
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
          }}
          register={register}
          errors={errors.amount}
        />
      </FieldContainer>

      <Button type="submit" label="Add ingredient" classes="mb-4" />
      <Button type="button" onClick={(): void => clearAutoComplete()} label="Clear ingredient" />

      <FieldContainer>
        <div>
          <p className="mb-2">These are the linked ingredients</p>

          {recipe.ingredients && recipe.ingredients.length ? (
            <div>
              {recipe.ingredients.map((ingredient: Ingredient) => {
                return (
                  <div key={ingredient.id}>
                    {ingredient.name} - {ingredient.amount}
                    {ingredient.unit}
                  </div>
                )
              })}
            </div>
          ) : (
            ''
          )}
        </div>
      </FieldContainer>
    </form>
  )
}

export default RecipesIngredients
