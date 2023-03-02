import { ChangeEvent, ChangeEventHandler, ReactElement, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import { Textfield, Number, Dropdown } from '../..'
import { INGREDIENT_UNITS } from '../../../constants'
import { updateIngredient } from '../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../types/RootState'

interface EditableIngredientListProps {
  ingredients: Ingredient[]
  recipe: Recipe
}

const EditableIngredientList: React.FC<EditableIngredientListProps> = ({ ingredients, recipe }): ReactElement => {
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()

  const dispatchEdit = async (name: string, value: string | number, ingredientId: number): Promise<boolean> => {
    const obj = {
      authorId: user.sub,
      recipeId: recipe.id,
      [name]: value,
      ingredientId,
    }

    // @ts-ignore:next-line
    await dispatch(updateIngredient(obj))
    return true
  }

  const debouncedSubmit = useRef(
    debounce(async (name, value, ingredientId) => {
      dispatchEdit(name, value, ingredientId)
    }, 500),
  ).current

  const setValue = (name: string, value: string | number, ingredientId: number): void => {
    debouncedSubmit(name, value, ingredientId)
  }

  return (
    <div>
      {ingredients.map((ingredient: Ingredient) => {
        return (
          <div key={ingredient.id} className="flex flex-row mb-4">
            <div className="pr-3">
              <Textfield
                name="name"
                type="input"
                label=""
                placeholder=""
                errors={undefined}
                defaultValue={ingredient.name}
                setValue={(value: number | string): void => {
                  setValue('name', value, ingredient.id)
                }}
                defaultIsNotEditing
                labelClasses=""
              />
            </div>

            <Number
              name="amount"
              label=""
              placeholder=""
              defaultValue={ingredient.amount}
              setValue={(value: number | string): void => {
                setValue('amount', value, ingredient.id)
              }}
            />

            <Dropdown
              name="unit"
              defaultValue={ingredient.unit}
              label=""
              options={INGREDIENT_UNITS}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                setValue('unit', e.target.value, ingredient.id)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EditableIngredientList
