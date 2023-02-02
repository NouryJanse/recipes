import { useEffect, useState, useRef, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import { updateIngredient } from '../../../redux/reducers/ingredients/ingredientSlice'

import { Button, Textfield, FieldContainer, Loader, Number, Toggle } from '../../index'

import RootState from '../../../types/RootState'
import isLoading from '../../../helpers/LoadingHelper'
import { PageTitle } from '../..'

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

    if (ingredient) {
      setToggle(ingredient.published)
    }
  }, [watch, ingredient, id, ingredient, params, isDirty])

  const debouncedSubmit = useRef(
    debounce(async (data, currentIngredient) => {
      dispatchEdit(data, currentIngredient)
    }, 1000),
  ).current

  useEffect(() => {
    const subscription = watch((data) => {
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
        <PageTitle text={`Editing ${ingredient.name}`} />

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
            errors={errors.name?.type === 'required' && 'Title is required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Textfield
            name="unit"
            type="text"
            label="Ingredient unit type*"
            placeholder="e.g. ml or gr"
            validation={{
              required: 'Did you forget to fill in your unit?',
            }}
            register={register}
            errors={errors.name?.type === 'required' && 'Ingredient unit is required'}
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
            errors={errors.description?.type === 'required' && 'Calories are required'}
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

        <Button type="submit" label="Save ingredient" classes={btnClasses} />

        <Link to="/ingredients">Back to ingredients</Link>
      </form>
    </div>
  )
}

export default EditIngredient
