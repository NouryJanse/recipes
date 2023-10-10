import { useEffect, useState, useRef, ReactElement, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import { updateIngredient } from '../../../../redux/reducers/ingredients/ingredientSlice'

import { Button, Textfield, FieldContainer, Loader, Number, Toggle, Dropdown } from '../../../index'

import RootState from '../../../../types/RootState'
import isLoading from '../../../../helpers/LoadingHelper'
import { PageTitle } from '../../..'
import { INGREDIENT_UNITS, REDUX_STATE } from '../../../../constants'

const EditIngredient: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const params = useParams()
  const formRef = useRef()

  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const status = useSelector((state: RootState) => state.ingredientSlice.status)

  const [id, setId] = useState<string | undefined>('')
  const [ingredient, setIngredient] = useState<Ingredient>()
  const [btnClasses, setBtnClasses] = useState('mb-10')
  const [toggle, setToggle] = useState(ingredient ? ingredient.published : false)
  const [unit, setUnit] = useState<string>('')
  const [ingredientName, setIngredientName] = useState<string>('')

  const hasURLParams = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm()

  const dispatchEdit = async (data: Ingredient, editedIngredient: Ingredient): Promise<boolean> => {
    if (!editedIngredient.id || !data.name) return false
    // @ts-ignore:next-line
    await dispatch(updateIngredient({ id: editedIngredient.id, ...editedIngredient, ...data }))
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    if (ingredient) dispatchEdit(formData, ingredient)
  }

  useEffect(() => {
    if (isDirty) setBtnClasses('font-bold mb-10')

    if (hasURLParams.current === false || !ingredient || !id) {
      if (!typeof params.ingredientId !== undefined) {
        setId(params.ingredientId)
      }

      if (id !== undefined && ingredients && ingredients.length) {
        // push find into a helper function
        setIngredient(
          ingredients.find((currentIngredient) => {
            return currentIngredient.id === parseInt(id.toString(), 10)
          }),
        )
      }
    }

    if (ingredient?.name) {
      setIngredientName(ingredient.name)
    }

    if (ingredient && status.updateIngredient !== REDUX_STATE.LOADING) {
      setToggle(ingredient.published)
      setUnit(ingredient.unit)
    }
  }, [watch, ingredient, id, ingredient, params, isDirty])

  const debouncedSubmit = useRef(
    debounce(async (data, currentIngredient) => {
      dispatchEdit(data, currentIngredient)
    }, 750),
  ).current

  useEffect(() => {
    const subscription = watch(async (data) => {
      await setIngredientName(data.name)
      debouncedSubmit(data, ingredient)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, ingredient, debouncedSubmit])

  if (!ingredient) {
    // Should be styled and moved into a component in the Ingredient subfolder
    return <p>Error, no ingredient found or still loading the ingredient from the server.</p>
  }

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  return (
    <div className="pt-7">
      <div className="flex items-center">
        <PageTitle text={`Editing ${ingredientName}`} />

        {isLoading(status) && <Loader />}
      </div>

      <form onSubmit={handleSubmit(onSave)} {...formRef}>
        <FieldContainer>
          <Textfield
            name="name"
            type="text"
            label="Ingredient name*"
            defaultValue={ingredient.name}
            placeholder="Fill in a name"
            validation={{
              required: 'Did you forget to name your ingredient?',
            }}
            register={register}
            errors={errors.name}
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            name="unit"
            label="Ingredient unit type*"
            defaultValue={unit}
            disabled={false}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setUnit(event.target.value)
              setValue('unit', event.target.value)
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
            name="calorieCount"
            label="Calories"
            defaultValue={ingredient.calorieCount}
            placeholder="Enter the number of calories"
            validation={{
              required: 'Did you forget to enter the calories?',
            }}
            register={register}
            errors={errors.description}
          />
        </FieldContainer>

        <FieldContainer>
          <Toggle
            handleToggle={(): void => handleToggle()}
            name="published"
            label="Enable ingredient"
            register={register}
            checked={toggle}
          />
        </FieldContainer>

        <Button
          type="submit"
          label="Save ingredient"
          classes={btnClasses}
          disabled={status.updateIngredient === REDUX_STATE.LOADING}
        />

        <Link to="/ingredients">Back to ingredients</Link>
      </form>
    </div>
  )
}

export default EditIngredient
