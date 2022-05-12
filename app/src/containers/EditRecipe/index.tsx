import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateRecipe } from '../../redux/reducers/recipes/recipeSlice'
import { uploadImageService } from '../../redux/reducers/recipes/services'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
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
import { useState } from 'react'
import { useRef } from 'react'
import RootState from '../../types/RootState'
import styled from 'styled-components'
import isLoading from '../../helpers/LoadingHelper'
import { Option } from '../../types/Option'
import RECIPE_COURSE_OPTIONS from '../../constants/RECIPE_COURSE_OPTIONS'
import Recipe from '../../types/Recipe'
import { Image } from '../../types/Image'
import { ImageData } from '../../types/ImageData'
import { debounce } from 'ts-debounce'

const EditRecipeContainer = styled.div`
  margin-bottom: 32px;
`

const EditRecipe = (data: any) => {
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const dispatch = useDispatch()
  const [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  const [recipe, setRecipe] = useState(data.recipe)
  const [id, setId] = useState<string | undefined>('')
  const [imagePreviewList, setImageViewList] = useState<ImageData[]>([])
  const [imageSortableList, setImageSortableList] = useState<ImageData[]>([])
  const params = useParams()
  const hasURLParams = useRef(false)
  const formRef = useRef()
  const [btnClasses, setBtnClasses] = useState('')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      // isValid
    },
    watch,
    setValue,
  } = useForm()

  const onSave = async (data: any) => {
    dispatchEdit(data, recipe)
  }

  const dispatchEdit = async (data: any, recipe: Recipe) => {
    if (!recipe.id || !data.name) return false
    // @ts-ignore:next-line
    await dispatch(updateRecipe({ id: recipe.id, ...recipe, ...data }))
  }

  useEffect(() => {
    if (isDirty) setBtnClasses('font-bold')
    if (hasURLParams.current === false || !recipe || !id) {
      if (!typeof params.recipeId !== undefined) {
        setId(params.recipeId)
      }

      if (id !== undefined && recipes && recipes.length) {
        setRecipe(
          recipes.find((recipe) => {
            return recipe.id === Number.parseInt(id!)
          }),
        )
      }
    }

    if (recipe?.images?.length > 0 && !initialRecipeLoad) {
      setImageSortableList(recipe?.images ? recipe.images : [])
      setInitialRecipeLoad(true)
    }
  }, [watch, recipe, id, recipes, params, imageSortableList, isDirty, initialRecipeLoad])

  const debouncedSubmit = useRef(
    debounce(async (data, recipe) => {
      dispatchEdit(data, recipe)
    }, 1000),
  ).current

  useEffect(() => {
    const subscription = watch((data) => {
      debouncedSubmit(data, recipe)
    })
    return () => subscription.unsubscribe()
  }, [watch, recipe, debouncedSubmit])

  const pushSelectedImage = (image: ImageData) => {
    setImageViewList((prevState: ImageData[]) => [...prevState, image])
  }

  const handleImageUpload = async (image: ImageData) => {
    const res = await uploadImageService(image)

    if (res.url) {
      setImageViewList((prevState: ImageData[]) => [
        ...prevState.filter((currentImage) => currentImage.data !== image.data),
      ])

      const uploadedImage: ImageData = {
        name: res.public_id,
        url: res.url,
        width: res.width,
        height: res.height,
        cloudinaryId: res.asset_id,
      }
      setImageSortableList((prevState: ImageData[]) =>
        [...prevState, uploadedImage].map((value, index) => {
          return { ...value, id: index }
        }),
      )
      setValue('images', [...imageSortableList, uploadedImage])
      handleSubmit(onSave)()
    } else {
      throw new Error('An error occurred, the recipe was not edited.')
    }
  }

  const handleSortedImages = (images: Image[]) => {
    setImageSortableList(images)
    setValue(
      'images',
      images.map((image: Image, index: number) => {
        return {
          ...image,
          position: index + 1,
        }
      }),
    )
    handleSubmit(onSave)()
  }

  const courseName = (courseValue: string, options: Option[]): string => {
    const option = options.find((option) => {
      if (option.value && option.value === courseValue) return option
      return null
    })
    if (option) return option.text
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
            Editing {recipe.name} - {courseName(recipe.course, RECIPE_COURSE_OPTIONS)}
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
            defaultValue={recipe.course}
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
        <Link to={`/recipes`}>Back to recipes</Link>
      </form>
    </EditRecipeContainer>
  )
}

export default EditRecipe
