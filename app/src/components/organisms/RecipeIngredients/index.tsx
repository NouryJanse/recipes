import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Button } from '../../index'
import RootState from '../../../types/RootState'
import { getIngredients, linkIngredientToRecipe } from '../../../redux/reducers/ingredients/ingredientSlice'
import { getRecipe } from '../../../redux/reducers/recipes/recipeSlice'

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
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [ref, setRef] = useState<any>(null)

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

  const handleAddIngredient = async (): Promise<void> => {
    const obj = {
      authorId: user.sub,
      recipeId,
      ingredientId: Number(selectedIngredient),
      amount: 50,
      unit: 'gr',
    }
    // @ts-ignore:next-line
    await dispatch(linkIngredientToRecipe(obj))
    console.log('1')
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipeId))
    console.log('2')
  }

  return (
    <div>
      <AutoComplete
        options={options}
        handleOnChange={(option: any): void => {
          if (option && option.value) {
            setSelectedIngredient(option.value)
          }
        }}
        setRef={setRef}
      />

      <Button type="button" onClick={(): Promise<void> => handleAddIngredient()} label="Add ingredient" />
      <Button type="button" onClick={(): void => clearAutoComplete()} label="Clear ingredient" />

      {recipe.ingredients && recipe.ingredients.length ? (
        <div>
          {recipe.ingredients.map((ingredient) => {
            return <div>{ingredient.name}</div>
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default RecipesIngredients
