import { useEffect, useState, useRef, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { debounce } from 'ts-debounce'
import styled from 'styled-components'
import { updateRecipe, createRecipeImage } from '../../redux/reducers/recipes/recipeSlice'
import uploadImageService from '../../redux/reducers/recipes/services'
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
import { Option } from '../../types/Option'
import { RECIPE_COURSE_OPTIONS } from '../../constants'
import { ImageData } from '../../types/ImageData'
import Image from '../../types/Image'

const EditRecipeContainer = styled.div`
  margin-bottom: 32px;
`

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
  const [btnClasses, setBtnClasses] = useState('')

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
    if (isDirty) setBtnClasses('font-bold')

    if (hasURLParams.current === false || !recipe || !id) {
      if (!typeof params.recipeId !== undefined) {
        setId(params.recipeId)
      }

      if (id !== undefined && recipes && recipes.length) {
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
    }
  }, [watch, recipe, id, recipes, params, imageSortableList, isDirty, initialRecipeLoad])

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

  const courseName = (courseValue: string, options: Option[]): string => {
    const currentOption = options.find((option) => {
      if (option.value && option.value === courseValue) return option
      return null
    })
    if (currentOption) return currentOption.text
    return ''
  }

  if (!recipe) {
    return <p>Error, no recipe found or still loading the recipe from the server.</p>
  }

  return (
    <EditRecipeContainer>
      <form onSubmit={handleSubmit(onSave)} {...formRef}>
        <div className="flex">
          <h2 className="font-bold">
            Editing {recipe.name} -{' '}
            {courseName(recipe.course ? recipe.course : '', RECIPE_COURSE_OPTIONS)}
          </h2>
          <div>{isLoading(status) && <Loader size={28} speed={2} />}</div>
        </div>

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
          <ImageSortableList images={imageSortableList} callbackSortedImages={handleSortedImages} />
        )}

        <Button type="submit" label="Save recipe" classes={btnClasses} />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>Back to recipe {recipe.name}</Link>
        )}
        <Link to="/recipes">Back to recipes</Link>
      </form>
    </EditRecipeContainer>
  )
}

export default EditRecipe
