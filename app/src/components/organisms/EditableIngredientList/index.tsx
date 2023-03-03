import { ChangeEvent, ChangeEventHandler, ReactElement, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import { Textfield, Number, Dropdown } from '../..'
import { INGREDIENT_UNITS } from '../../../constants'
import { updateRecipeIngredient } from '../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../types/RootState'

interface EditableIngredientListProps {
  ingredients: RecipeIngredient[]
  recipe: Recipe
}

type LocalUnit = {
  id: number
  unit: string | undefined
}

const EditableIngredientList: React.FC<EditableIngredientListProps> = ({ ingredients, recipe }): ReactElement => {
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()
  const [updatedIngredient, setUpdatedIngredient] = useState<RecipeIngredient>()
  const [unit, setUnit] = useState<LocalUnit[]>(
    ingredients.map((ingredient: RecipeIngredient) => {
      return { id: ingredient.id, unit: ingredient.unit }
    }),
  )

  const dispatchEdit = async (ingredient: RecipeIngredient): Promise<boolean> => {
    // @ts-ignore:next-line
    await dispatch(updateRecipeIngredient(ingredient))
    return true
  }

  const debouncedSubmit = useRef(
    debounce(async (ingredient: RecipeIngredient) => {
      dispatchEdit(ingredient)
    }, 500),
  ).current

  const setValue = async (name: string, value: number | string, linkedIngredient: RecipeIngredient): Promise<void> => {
    await setUpdatedIngredient({
      authorId: user.sub,
      recipeId: recipe.id,
      id: linkedIngredient.id,
      [name]: value,
    })
  }

  useEffect(() => {
    if (updatedIngredient) debouncedSubmit(updatedIngredient)
  }, [updatedIngredient])

  const currentUnit = (linkedIngredient): string => {
    const res: LocalUnit | undefined = unit.find((u) => {
      return u.id === linkedIngredient.id ? u : null
    })
    if (res?.unit) return res.unit
    return ''
  }

  return (
    <div>
      {ingredients.map((linkedIngredient: RecipeIngredient) => {
        return (
          <div key={linkedIngredient.id} className="flex flex-row mb-4">
            <div className="pr-3 self-center">{linkedIngredient.name}</div>

            <Number
              name="amount"
              label=""
              placeholder=""
              defaultValue={linkedIngredient.amount}
              setValue={(value: number): void => {
                setValue('amount', +value, linkedIngredient)
              }}
            />

            <Dropdown
              name="unit"
              defaultValue={currentUnit(linkedIngredient)}
              label=""
              options={INGREDIENT_UNITS}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                setUnit(
                  unit.map((u) => {
                    if (u.id === linkedIngredient.id) {
                      return { id: u.id, unit: e.target.value }
                    }
                    return u
                  }),
                )
                setValue('unit', e.target.value, linkedIngredient)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EditableIngredientList
