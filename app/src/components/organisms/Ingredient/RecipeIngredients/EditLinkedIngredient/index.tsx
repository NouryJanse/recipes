import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { BiEdit, BiSave } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import { Number, Dropdown, Icon } from '../../../..'
import { INGREDIENT_UNITS } from '../../../../../constants'
import {
  deleteIngredient,
  deleteLinkedIngredient,
  updateRecipeIngredient,
} from '../../../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../../../types/RootState'

interface EditableIngredientListProps {
  ingredient: RecipeIngredient
  recipe: Recipe
}

type LocalUnit = {
  id: number
  unit: string | undefined
}

const EditLinkedIngredient: React.FC<EditableIngredientListProps> = ({ ingredient, recipe }): ReactElement => {
  const user: User = useSelector((state: RootState) => state.userSlice.data.user)
  const dispatch = useDispatch()
  const [updatedIngredient, setUpdatedIngredient] = useState<RecipeIngredient>()
  const [unit, setUnit] = useState<LocalUnit>({ id: ingredient.id, unit: ingredient.unit })

  const dispatchEdit = async (localIngredient: RecipeIngredient): Promise<boolean> => {
    // @ts-ignore:next-line
    await dispatch(updateRecipeIngredient(localIngredient))
    return true
  }

  const debouncedSubmit = useRef(
    debounce(async (localIngredient: RecipeIngredient) => {
      dispatchEdit(localIngredient)
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

  const onDeleteIngredient = (): void => {
    // @ts-ignore:next-line
    dispatch(deleteLinkedIngredient(ingredient.id))
  }

  return (
    <div>
      <div key={ingredient.id} className="flex flex-row align-middle mb-4">
        <div className="pr-3 self-center justify-center w-52">{ingredient.name}</div>

        <Number
          name="amount"
          label=""
          placeholder=""
          defaultValue={ingredient.amount}
          setValue={(value: number): void => {
            setValue('amount', +value, ingredient)
          }}
          classes="mr-2"
        />

        <Dropdown
          name="unit"
          defaultValue={unit.unit ? unit.unit : ''}
          label=""
          options={INGREDIENT_UNITS}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setUnit({ id: unit.id, unit: e.target.value })
            setValue('unit', e.target.value, ingredient)
          }}
          classes="w-24"
        />

        <Icon
          iconElement={<BiEdit style={{ color: 'gray', width: '32px', height: '32px' }} />}
          classes="items-center"
        />
        <Icon
          iconElement={<BiSave style={{ color: 'gray', width: '32px', height: '32px' }} />}
          classes="items-center"
        />
        <Icon
          iconElement={
            <MdDeleteOutline
              style={{ color: 'gray', width: '32px', height: '32px' }}
              // onMouseEnter={(): void => console.log('enter')}
              // onMouseLeave={(): void => console.log('leave')}
              onClick={(): void => onDeleteIngredient()}
            />
          }
          classes="items-center"
        />
      </div>
    </div>
  )
}

export default EditLinkedIngredient
