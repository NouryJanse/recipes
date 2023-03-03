import { useEffect, useState, useRef, ReactElement, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import {
  updateRecipe,
  createRecipeImage,
  deleteRecipeImage,
  getRecipe,
} from '../../../redux/reducers/recipes/recipeSlice'
import {
  Button,
  Textfield,
  Textarea,
  Dropdown,
  ImagePicker,
  ImagePreviewList,
  ImageSortableList,
  FieldContainer,
  Loader,
  RecipesIngredients,
  Heading,
} from '../../index'

import RootState from '../../../types/RootState'
import isLoading from '../../../helpers/LoadingHelper'
import { RECIPE_COURSE_OPTIONS } from '../../../constants'
import courseName from './helpers'
import { PageTitle } from '../..'

const EditRecipe: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const params = useParams()
  const formRef = useRef()

  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const status = useSelector((state: RootState) => state.recipeSlice.status)

  const [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  const [id, setId] = useState<string | undefined>('')
  const [recipe, setRecipe] = useState<Recipe>()
  const [imagePreviewList, setImageViewList] = useState<ImageData[]>([])
  const [imageSortableList, setImageSortableList] = useState<Image[]>([])
  const [btnClasses, setBtnClasses] = useState('mb-10')
  const [recipeName, setRecipeName] = useState<string>('')
  const [course, setCourse] = useState<string>('')

  const hasURLParams = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    getValues,
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

  useEffect(() => {
    if (isDirty) setBtnClasses('font-bold mb-10')

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

    if (recipe && recipe.images && !initialRecipeLoad) {
      setImageSortableList(recipe?.images ? recipe.images : [])
      setInitialRecipeLoad(true)
    } else if (recipe && !recipe.images && !initialRecipeLoad) {
      setImageSortableList([])
    }
  }, [recipe, id, recipes, params, isDirty, initialRecipeLoad])

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

  const pushSelectedImage = (image: ImageData): void => {
    setImageViewList((prevState: ImageData[]) => [...prevState, image])
  }

  const handleImageUpload = async (image: ImageData): Promise<void> => {
    // @ts-ignore:next-line
    const response = await dispatch(createRecipeImage({ image, recipeId: recipe.id }))
    if (response.type === 'recipes/createRecipeImage/fulfilled') {
      setImageViewList((prevState: ImageData[]) => [
        ...prevState.filter((currentImage) => currentImage.data !== image.data),
      ])
      setInitialRecipeLoad(false)
      setImageSortableList(recipe?.images ? recipe.images : [])
      return
    }
    throw new Error('An error occurred, the recipe image was not saved correctly.')
  }

  const handleSortedImages = (images: Image[]): void => {
    setImageSortableList(images)
    setValue(
      'images',
      // @ts-ignore:next-line
      images.map((image: ImageData, index: number) => {
        return {
          ...image,
          position: index + 1,
        }
      }),
    )
    handleSubmit(onSave)()
  }

  const deleteImage = async (imageId: string): Promise<void> => {
    // @ts-ignore:next-line
    await dispatch(deleteRecipeImage(imageId))
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipe.id))
    setInitialRecipeLoad(false)
  }

  if (!recipe) {
    // Should be styled and moved into a component in the Recipe subfolder
    return <p>Error, no recipe found or still loading the recipe from the server.</p>
  }

  return (
    <div className="pt-7">
      <div className="flex justify-between">
        <PageTitle
          text={`Editing ${recipeName} - ${courseName(recipe.course ? recipe.course : '', RECIPE_COURSE_OPTIONS)}`}
        />

        {isLoading(status) && <Loader />}

        <Button
          onClick={(): Promise<void> => handleSubmit(onSave)()}
          type="submit"
          label="Save recipe"
          classes={`${btnClasses} mr-2`}
        />
      </div>

      <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <form className="" onSubmit={handleSubmit(onSave)} {...formRef}>
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

            <FieldContainer>
              <ImagePicker
                name="images"
                label="Drag 'n' drop some files here, or click to select files"
                register={register}
                validation={{
                  required: 'Did you forget to add images to your recipe?',
                }}
                onSelectedImageCallback={pushSelectedImage}
              />
            </FieldContainer>

            {!!imagePreviewList.length && (
              <ImagePreviewList images={imagePreviewList} callbackUploadImages={handleImageUpload} />
            )}

            {!!imageSortableList.length && (
              <ImageSortableList
                images={imageSortableList}
                callbackSortedImages={handleSortedImages}
                onDelete={deleteImage}
              />
            )}

            {params.recipeId && (
              <Link to={`/recipes/${params.recipeId}`}>
                Back to <b>{recipe.name}</b>
              </Link>
            )}

            <Link to="/recipes">Back to recipes</Link>
          </form>
        </div>
        <div>
          <Heading headingLevel="h2" extraClasses="">
            Ingredients
          </Heading>
          {id && <RecipesIngredients recipe={recipe} />}
        </div>
      </div>
    </div>
  )
}

export default EditRecipe
