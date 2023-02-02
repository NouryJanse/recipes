import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { AutoComplete, Button, Dropdown, FieldContainer, Number } from '../../index'
import RootState from '../../../types/RootState'
import { getIngredients, linkIngredientToRecipe } from '../../../redux/reducers/ingredients/ingredientSlice'
import { getRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import { INGREDIENT_UNITS } from '../../../constants'

type OptionType = {
  value: string
  label: string
}

type RecipesIngredientsProps = { recipeId: number; recipe: Recipe }

const RecipesIngredients: React.FC<RecipesIngredientsProps> = ({ recipe, recipeId }): ReactElement => {
  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()
  const [options, setOptions] = useState<OptionType[]>()
  const [selectedIngredient, setSelectedIngredient] = useState<Option | null>(null)
  const [ref, setRef] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm()

  const clearAutoComplete = (): void => {
    if (ref !== null) {
      ref.clearValue()
    }
  }

  useEffect(() => {
    if (!ingredients || ingredients?.length < 1) {
      // @ts-ignore:next-line
      dispatch(getIngredients())
    } else {
      setOptions(
        ingredients.map((ingredient: Ingredient): OptionType => {
          return { value: ingredient.id ? ingredient.id.toString() : '', label: ingredient.name ? ingredient.name : '' }
        }),
      )
    }
  }, [dispatch, ingredients])

  const handleAddIngredient = async (): Promise<void> => {}

  const dispatchEdit = async (data: Ingredient): Promise<boolean> => {
    // if (!editedIngredient.id || !data.name) return false
    // // @ts-ignore:next-line
    // await dispatch(updateIngredient({ id: editedIngredient.id, ...editedIngredient, ...data }))

    console.log(data)

    // const obj = {
    //   authorId: user.sub,
    //   recipeId,
    //   ingredientId: Number(selectedIngredient),
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
    // if (ingredient) dispatchEdit(formData, ingredient)
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FieldContainer>
        <AutoComplete
          options={options}
          handleOnChange={(option: any): void => {
            if (option && option.value) {
              setSelectedIngredient(option.value)
            }
          }}
          setRef={setRef}
        />
      </FieldContainer>

      <FieldContainer>
        <Dropdown
          name="unit"
          label="Unit*"
          defaultValue={recipe.course ? recipe.course : ''}
          disabled={false}
          validation={{
            required: 'Did you forget to fill in the course of your recipe?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Course is required'}
          options={INGREDIENT_UNITS}
        />
      </FieldContainer>

      <FieldContainer>
        <Number
          name="amount"
          label="Amount"
          // defaultValue={ingredient.unit}
          placeholder="Enter the number of calories"
          validation={{
            required: 'Did you forget to enter the calories?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Calories are required'}
        />
      </FieldContainer>

      <Button type="button" onClick={(): Promise<void> => handleAddIngredient()} label="Add ingredient" />
      <Button type="button" onClick={(): void => clearAutoComplete()} label="Clear ingredient" />

      <FieldContainer>
        <div>
          <p>These are the linked ingredients</p>
          {recipe.ingredients && recipe.ingredients.length ? (
            <div>
              {recipe.ingredients.map((ingredient: any) => {
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
