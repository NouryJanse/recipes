import { useEffect, useState, useRef, ReactElement, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import { updateRecipe } from '../../../redux/reducers/recipes/recipeSlice'
import {
  Button,
  Textfield,
  Textarea,
  Dropdown,
  FieldContainer,
  Loader,
  WrapperRecipeIngredients,
  Images,
  Toggle,
} from '../../../components/index'

import RootState from '../../../types/RootState'
import isLoading from '../../../helpers/LoadingHelper'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'
import courseName from './helpers'
import { PageTitle } from '../../../components'

const EditRecipe: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const params = useParams()
  const formRef = useRef()

  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const recipeStatus = useSelector((state: RootState) => state.recipeSlice.status)
  const ingredientStatus = useSelector((state: RootState) => state.ingredientSlice.status)
  const status = { ...recipeStatus, ...ingredientStatus }

  const [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  const [id, setId] = useState<string | undefined>('')
  const [recipe, setRecipe] = useState<Recipe>()
  const [btnClasses, setBtnClasses] = useState('')
  const [recipeName, setRecipeName] = useState<string>('')
  const [course, setCourse] = useState<string>('')
  const [toggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const hasURLParams = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm()

  const dispatchEdit = async (data: Recipe, editedRecipe: Recipe): Promise<boolean> => {
    if (!editedRecipe.id || !data.name) return false
    // @ts-ignore:next-line
    await dispatch(updateRecipe({ id: editedRecipe.id, ...editedRecipe, ...data }))
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    if (recipe) dispatchEdit(formData, recipe)
  }

  // useEffect for reacting to the fetched recipe
  useEffect(() => {
    if (isDirty) setBtnClasses('font-bold')

    if (hasURLParams.current === false || !recipe || !id) {
      if (!typeof params.recipeId !== undefined) {
        setId(params.recipeId)
      }

      if (id !== undefined && recipes && recipes.length) {
        // push find into a helper function
        setRecipe(
          recipes.find((currentRecipe) => {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            return currentRecipe.id === Number(id!)
          }),
        )
      }
    }

    if (recipe?.name) {
      setRecipeName(recipe.name)
    }
    if (recipe?.course) {
      setCourse(recipe.course)
    }

    if (recipe) {
      setToggle(recipe.published)
    }
  }, [recipe, id, recipes, params, isDirty, initialRecipeLoad])

  const debouncedSubmit = useRef(
    debounce(async (data, currentRecipe) => {
      dispatchEdit(data, currentRecipe)
    }, 750),
  ).current

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  // useEffect for the form
  useEffect(() => {
    const subscription = watch(async (data) => {
      await setRecipeName(data.name)
      debouncedSubmit(data, recipe)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, recipe, debouncedSubmit])

  if (!recipe) {
    // Should be styled and moved into a component in the Recipe subfolder
    return <p>Error, no recipe found or still loading the recipe from the server.</p>
  }

  return (
    <div className="pt-7">
      <div className="flex justify-between mb-16">
        <PageTitle
          text={`Editing ${recipeName} - ${
            recipe.course ? `${courseName(recipe.course ? recipe.course : '', RECIPE_COURSE_OPTIONS)}` : ''
          }`}
        />

        {isLoading(status) && <Loader />}

        <div className="flex flex-row">
          <Button
            onClick={(): void => navigate('/recipes')}
            type="button"
            label="To recipes"
            classes={`${btnClasses} self-center mr-3`}
            buttonStyle="tertiary"
          />
          {params.recipeId && (
            <Button
              onClick={(): void => navigate(`/recipes/${params.recipeId}`)}
              type="button"
              label={`To ${recipe.name}`}
              classes={`${btnClasses} self-center mr-3`}
              buttonStyle="secondary"
            />
          )}
          <Button
            onClick={(): Promise<void> => handleSubmit(onSave)()}
            type="button"
            label="Save"
            classes={`${btnClasses} self-center`}
            buttonStyle="primary"
          />
        </div>
      </div>

      <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="mb-4 mr-4 pr-4">
          <form className="" onSubmit={handleSubmit(onSave)} {...formRef}>
            <FieldContainer>
              <Toggle
                handleToggle={(): void => handleToggle()}
                name="published"
                label="Published"
                register={register}
                checked={toggle}
              />
            </FieldContainer>

            <FieldContainer>
              <Textfield
                name="name"
                type="text"
                defaultValue={recipe.name}
                label="Recipe name*"
                placeholder="Fill in a name"
                validation={{
                  required: 'Did you forget to name your recipe?',
                }}
                register={register}
                errors={errors.name}
              />
            </FieldContainer>

            <FieldContainer>
              <Textarea
                name="description"
                label="Recipe description*"
                defaultValue={recipe.description}
                placeholder="Fill in a description"
                validation={{
                  required: 'Did you forget to fill in the description of your recipe?',
                }}
                register={register}
                errors={errors.description}
              />
            </FieldContainer>

            <FieldContainer>
              <Dropdown
                name="course"
                label="Course*"
                defaultValue={course}
                register={register}
                classes="mb-10"
                validation={{
                  required: 'Did you forget to fill in the course of your recipe?',
                }}
                errors={errors.description}
                options={RECIPE_COURSE_OPTIONS}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setCourse(event.target.value)
                  setValue('course', event.target.value)
                }}
              />
            </FieldContainer>

            <Images
              register={register}
              recipe={recipe}
              setValue={setValue}
              setInitialRecipeLoad={setInitialRecipeLoad}
              initialRecipeLoad={initialRecipeLoad}
            />
          </form>
        </div>

        {/* LINKING INGREDIENTS HERE */}
        <WrapperRecipeIngredients recipe={recipe} />
      </div>
    </div>
  )
}

export default EditRecipe
