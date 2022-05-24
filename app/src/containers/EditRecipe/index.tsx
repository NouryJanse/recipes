import { useEffect, useState, useRef, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import {
  updateRecipe,
  createRecipeImage,
  deleteRecipeImage,
  getRecipe,
} from '../../redux/reducers/recipes/recipeSlice'
import { uploadImageService } from '../../redux/reducers/recipes/services'
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
} from '../../components/index'

import RootState from '../../types/RootState'
import isLoading from '../../helpers/LoadingHelper'
import { RECIPE_COURSE_OPTIONS } from '../../constants'
import courseName from './helpers'
import PageTitle from '../../components/Generic/PageTitle'

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
            return currentRecipe.id === Number(id!)
          }),
        )
      }
    }

    if (recipe && recipe.images && !initialRecipeLoad) {
      setImageSortableList(recipe?.images ? recipe.images : [])
      setInitialRecipeLoad(true)
    } else if (recipe && !recipe.images && !initialRecipeLoad) {
      setImageSortableList([])
    }
  }, [watch, recipe, id, recipes, params, isDirty, initialRecipeLoad])

  const debouncedSubmit = useRef(
    debounce(async (data, currentRecipe) => {
      dispatchEdit(data, currentRecipe)
    }, 1000),
  ).current

  useEffect(() => {
    const subscription = watch((data) => {
      debouncedSubmit(data, recipe)
    })
    return (): void => subscription.unsubscribe()
  }, [watch, recipe, debouncedSubmit])

  const pushSelectedImage = (image: ImageData): void => {
    setImageViewList((prevState: ImageData[]) => [...prevState, image])
  }

  const handleImageUpload = async (image: ImageData): Promise<void> => {
    const uploadedImage: CloudinaryImage | false = await uploadImageService(image)
    if (!uploadedImage) return
    // @ts-ignore:next-line
    await dispatch(createRecipeImage({ ...uploadedImage, recipeId: recipe.id }))
    if (uploadedImage.url) {
      setImageViewList((prevState: ImageData[]) => [
        ...prevState.filter((currentImage) => currentImage.data !== image.data),
      ])
      setInitialRecipeLoad(false)
      setImageSortableList(recipe?.images ? recipe.images : [])
    } else {
      throw new Error('An error occurred, the recipe was not edited.')
    }
  }

  const handleSortedImages = (images: Image[]): void => {
    setImageSortableList(images)
    setValue(
      'images',
      images.map((image: ImageData, index: number) => {
        return {
          ...image,
          position: index + 1,
        }
      }),
    )
    handleSubmit(onSave)()
  }

  const deleteImage = async (imageId: number): Promise<void> => {
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
      <div className="flex items-center">
        <PageTitle
          text={`Editing ${recipe.name} - ${courseName(
            recipe.course ? recipe.course : '',
            RECIPE_COURSE_OPTIONS,
          )}`}
        />

        {isLoading(status) && <Loader />}
      </div>

      <form onSubmit={handleSubmit(onSave)} {...formRef}>
        <FieldContainer>
          <Textfield
            name="name"
            type="text"
            label="Recipe name*"
            defaultValue={recipe.name}
            placeholder="Fill in a name"
            validation={{
              required: 'Did you forget to name your recipe?',
            }}
            register={register}
            errors={errors.name?.type === 'required' && 'Title is required'}
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
            errors={errors.description?.type === 'required' && 'Description is required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            name="course"
            label="Course*"
            defaultValue={recipe.course ? recipe.course : ''}
            disabled={false}
            validation={{
              required: 'Did you forget to fill in the course of your recipe?',
            }}
            register={register}
            errors={errors.description?.type === 'required' && 'Course is required'}
            options={RECIPE_COURSE_OPTIONS}
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

        <Button type="submit" label="Save recipe" classes={btnClasses} />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>
            Back to <b>{recipe.name}</b>
          </Link>
        )}

        <Link to="/recipes">Back to recipes</Link>
      </form>
    </div>
  )
}

export default EditRecipe
