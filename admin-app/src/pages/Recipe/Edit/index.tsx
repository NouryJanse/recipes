import { useEffect, useState, useRef, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import { Loader, WrapperRecipeIngredients } from '../../../components/index'
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
    refetchOnMountOrArgChange: true,
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

  useEffect(() => {
    if (params.recipeId !== undefined) {
      setId(Number.parseInt(params.recipeId, 10))
      setSkip(false)
    }
  }, [params.recipeId])

  const dispatchEdit = async (recipe: Recipe, editedRecipe: Recipe): Promise<boolean> => {
    if (!editedRecipe.id || !recipe.name) return false
    // @ts-ignore:next-line
    await updateRecipe({ ...editedRecipe, ...recipe })
    return true
  }

  // for now this any is allowed, otherwise the whole form needs to be refactored for typing
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onSave = async (formData: any): Promise<void> => {
    if (recipe) dispatchEdit(formData, recipe)
  }

  const debouncedSubmit = useRef(
    debounce(async (data, currentRecipe) => {
      dispatchEdit(data, currentRecipe)
    }, 350),
  ).current

  useEffect(() => {
    if (recipe && recipe.name) setRecipeName(recipe.name)
    const subscription = watch(async (data) => {
      await setRecipeName(data.name)
      debouncedSubmit(data, recipe)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, recipe, debouncedSubmit])

  if (!recipe) {
    return <p>Fetching the recipe from the server...</p>
  }

  return (
    <div className="pt-7">
      <div className="flex justify-between mb-16 items-center">
        <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">{`Editing ${recipeName}`}</h1>

        {isUpdating && <Loader />}

        <Navigation handleSubmit={handleSubmit} onSave={onSave} recipe={recipe} btnClasses={''} />
      </div>

      <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-5">
        <Form
          handleSubmit={handleSubmit}
          onSave={onSave}
          formRef={formRef}
          register={register}
          recipe={recipe}
          errors={errors}
          setValue={setValue}
          setInitialRecipeLoad={setInitialRecipeLoad}
          initialRecipeLoad={initialRecipeLoad}
        />

        <WrapperRecipeIngredients recipe={recipe} />
      </div>
    </div>
  )
}

export default EditRecipe
