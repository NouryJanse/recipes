import { useEffect, useState, useRef, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import {
  updateIngredient,
  getIngredient,
} from '../../../redux/reducers/ingredients/ingredientSlice'

import { Button, Textfield, Textarea, Dropdown, FieldContainer, Loader, Number } from '../../index'

import RootState from '../../../types/RootState'
import isLoading from '../../../helpers/LoadingHelper'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'
import { PageTitle } from '../..'
import ID from '../../../redux/reducers/recipes/generateID'

const EditIngredient: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const params = useParams()
  const formRef = useRef()

  const ingredients = useSelector((state: RootState) => state.ingredientSlice.data.ingredients)
  const status = useSelector((state: RootState) => state.ingredientSlice.status)

  const [initialIngredientLoad, setInitialIngredientLoad] = useState(false)
  const [id, setId] = useState<string | undefined>('')
  const [ingredient, setIngredient] = useState<Ingredient>()
  const [btnClasses, setBtnClasses] = useState('mb-10')

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
            return currentIngredient.id === parseInt(id)
          }),
        )
      }
    }

    // if (ingredient && ingredient.images && !initialIngredientLoad) {
    //   setImageSortableList(recipe?.images ? recipe.images : [])
    //   setInitialRecipeLoad(true)
    // } else if (recipe && !recipe.images && !initialIngredientLoad) {
    //   setImageSortableList([])
    // }
  }, [watch, ingredient, id, ingredient, params, isDirty, initialIngredientLoad])

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

  return (
    <div className="pt-7">
      <div className="flex items-center">
        {/* <PageTitle
          text={`Editing ${recipe.name} - ${courseName(
            recipe.course ? recipe.course : '',
            RECIPE_COURSE_OPTIONS,
          )}`}
        /> */}

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

        {/* <FieldContainer>
          <Dropdown
            name="course"
            label="Course*"
            defaultValue={ingredient.course ? ingredient.course : ''}
            disabled={false}
            validation={{
              required: 'Did you forget to fill in the course of your recipe?',
            }}
            register={register}
            errors={errors.description?.type === 'required' && 'Course is required'}
            options={RECIPE_COURSE_OPTIONS}
          />
        </FieldContainer> */}

        <Button type="submit" label="Save ingredient" classes={btnClasses} />

        {params.ingredientId && (
          <Link to={`/ingredient/${params.ingredientId}`}>
            Back to <b>{ingredient.name}</b>
          </Link>
        )}

        <Link to="/ingredients">Back to ingredients</Link>
      </form>
    </div>
  )
}

export default EditIngredient
