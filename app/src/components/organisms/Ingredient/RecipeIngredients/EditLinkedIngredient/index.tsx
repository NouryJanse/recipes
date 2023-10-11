import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { BsSave2, BsTrash2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import { Number, Dropdown, Icon, AutoComplete } from '../../../..'
import { INGREDIENT_UNITS } from '../../../../../constants'
import {
  deleteLinkedIngredient,
  updateRecipeIngredient,
} from '../../../../../redux/reducers/ingredients/ingredientSlice'
import RootState from '../../../../../types/RootState'
import { getRecipe } from '../../../../../redux/reducers/recipes/recipeSlice'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

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
  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const [unit, setUnit] = useState<LocalUnit>({ id: ingredient.id, unit: ingredient.unit })
  const [ref, setRef] = useState<StateManagedSelect>()
  const [options, setOptions] = useState<Option[]>()

  const dispatchEdit = async (localIngredient: RecipeIngredient): Promise<boolean> => {
    console.log(localIngredient)

    // @ts-ignore:next-line
    await dispatch(updateRecipeIngredient(localIngredient))
    return true
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

  const debouncedSubmit = useRef(
    debounce(async (localIngredient: RecipeIngredient) => {
      dispatchEdit(localIngredient)
    }, 500),
  ).current

  const updateIngredient = async (
    name: string,
    value: number | string,
    linkedIngredient: RecipeIngredient,
  ): Promise<void> => {
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

  const onDeleteIngredient = async (): Promise<void> => {
    // @ts-ignore:next-line
    await dispatch(deleteLinkedIngredient(ingredient.id))
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipe.id))
  }

  if (!options) return <p>Loading..</p>

  const option: Option | undefined = options.find((o) => {
    return o.label === ingredient.name
  })

  return (
    <div>
      <div key={ingredient.id} className="flex flex-row align-middle mb-4">
        {/* <div className="pr-3 self-center justify-center w-52">{ingredient.name}</div> */}

        <AutoComplete
          labelText="Search for an ingredient*"
          name="ingredient"
          options={options}
          handleOnChange={(option: Option | null): void => {
            if (option && option.value) {
              updateIngredient('ingredientId', parseInt(option.value), ingredient)
            }
          }}
          defaultValue={option}
          setRef={setRef}
          errors={{ message: '', type: '' }}
        />

        <Number
          name="amount"
          label=""
          placeholder=""
          defaultValue={ingredient.amount}
          setValue={(value: number): void => {
            updateIngredient('amount', +value, ingredient)
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
            updateIngredient('unit', e.target.value, ingredient)
          }}
          classes="w-24"
        />

        <Icon
          iconElement={<BsSave2 style={{ color: 'gray', width: '32px', height: '32px' }} />}
          classes="items-center"
        />
        <Icon
          iconElement={
            <BsTrash2
              style={{ color: 'gray', width: '32px', height: '32px' }}
              onMouseEnter={(): void => console.log('enter')}
              onMouseLeave={(): void => console.log('leave')}
              onClick={(): Promise<void> => onDeleteIngredient()}
            />
          }
          classes="items-center"
        />
      </div>
    </div>
  )
}

export default EditLinkedIngredient
