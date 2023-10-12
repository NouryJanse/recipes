import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { BsTrash2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'ts-debounce'
import { Number, Dropdown, Icon, AutoComplete } from '../../../..'
import { INGREDIENT_UNITS } from '../../../../../constants'
import {
  deleteLinkedIngredient,
  getIngredients,
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
    // @ts-ignore:next-line
    await dispatch(updateRecipeIngredient(localIngredient))
    // @ts-ignore:next-line
    dispatch(getIngredients())
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
    debounce((localIngredient: RecipeIngredient) => {
      dispatchEdit(localIngredient)
    }, 500),
  ).current

  const updateIngredient = (name: string, value: number | string, linkedIngredient: RecipeIngredient): void => {
    setUpdatedIngredient({
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

  // if (!option) return <p>Loading..</p>

  return (
    <div>
      <div key={ingredient.id} className="flex flex-row items-end mb-4">
        {/* <div className="pr-3 self-center justify-center w-52">{ingredient.name}</div> */}

        <AutoComplete
          labelText="Ingredient"
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
          classes="mr-4"
          isCreatable={true}
        />

        <Number
          name="amount"
          label="Amount"
          placeholder=""
          defaultValue={ingredient.amount}
          setValue={(value: number): void => {
            updateIngredient('amount', +value, ingredient)
          }}
          classes="mr-4"
        />

        <Dropdown
          name="unit"
          defaultValue={unit.unit ? unit.unit : ''}
          label="Unit"
          options={INGREDIENT_UNITS}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setUnit({ id: unit.id, unit: e.target.value })
            updateIngredient('unit', e.target.value, ingredient)
          }}
          classes="w-24 mr-4"
        />

        {/* <Icon
          iconElement={<BsSave2 style={{ color: 'gray', width: '32px', height: '32px' }} />}
          classes="items-center"
        /> */}

        <Icon
          iconElement={
            <BsTrash2
              style={{ color: 'gray', width: '32px', height: '32px', marginBottom: '4px' }}
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
