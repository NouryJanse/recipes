import { useEffect, useState, useRef, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import { Loader, WrapperRecipeIngredients } from '../../../components/index'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'
import courseName from './helpers'
import { PageTitle } from '../../../components'
import Form from './form'
import Navigation from './navigation'
import { useGetRecipeQuery, useUpdateRecipeMutation } from '../../../redux/reducers/recipes/recipes'

const EditRecipe: React.FC = (): ReactElement => {
  const formRef = useRef()

  const [id, setId] = useState<number>(-1)
  const [skip, setSkip] = useState<boolean>(true)
  const params = useParams()
  const { data: recipe } = useGetRecipeQuery(id, {
    skip,
  })
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm()
  const [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  const [recipeName, setRecipeName] = useState<string>('')
  const [course, setCourse] = useState<string>('')
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (params.recipeId !== undefined) {
      setId(Number.parseInt(params.recipeId, 10))
      setSkip(false)
    }
  }, [params.recipeId])

  const dispatchEdit = async (recipe: Recipe, editedRecipe: Recipe): Promise<boolean> => {
    if (!editedRecipe.id || !recipe.name) return false
    // @ts-ignore:next-line
    await updateRecipe({ id: editedRecipe.id, ...editedRecipe, ...recipe })
    // await dispatch(updateRecipe({ id: editedRecipe.id, ...editedRecipe, ...recipe }))
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    if (recipe) dispatchEdit(formData, recipe)
  }

  const handleToggle = (): void => {
    setValue('published', !toggle)
    setToggle(!toggle)
  }

  const debouncedSubmit = useRef(
    debounce(async (data, currentRecipe) => {
      dispatchEdit(data, currentRecipe)
    }, 750),
  ).current

  useEffect(() => {
    const subscription = watch(async (data) => {
      await setRecipeName(data.name)
      debouncedSubmit(data, recipe)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, recipe, debouncedSubmit])

  if (!recipe) {
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

        {isUpdating && <Loader />}

        <Navigation handleSubmit={handleSubmit} onSave={onSave} recipe={recipe} btnClasses={''} />
      </div>

      <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-5">
        <Form
          handleSubmit={handleSubmit}
          onSave={onSave}
          formRef={formRef}
          handleToggle={handleToggle}
          register={register}
          toggle={toggle}
          recipe={recipe}
          errors={errors}
          course={course}
          setCourse={setCourse}
          setValue={setValue}
          setInitialRecipeLoad={setInitialRecipeLoad}
          initialRecipeLoad={initialRecipeLoad}
        />

        {/* LINKING INGREDIENTS HERE */}
        <WrapperRecipeIngredients recipe={recipe} />
      </div>
    </div>
  )
}

export default EditRecipe
