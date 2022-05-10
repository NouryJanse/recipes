import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateRecipe } from '../../redux/reducers/recipes/recipeSlice'
import { uploadImageService } from '../../redux/reducers/recipes/services'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Image } from '../../types/Image'
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

const EditRecipeContainer = styled.div`
  margin-bottom: 32px;
`

// should be moved to fixed constants externally
const options = [
  { text: 'Make a choice', value: 'Make a choice', disabled: true },
  { text: 'Breakfast', value: 'breakfast', disabled: false },
  { text: 'Lunch', value: 'lunch', disabled: false },
  { text: 'Aperitivo', value: 'aperitivo', disabled: false },
  { text: 'Dinner', value: 'dinner', disabled: false },
]

const EditRecipe = (data: any) => {
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const status = useSelector((state: RootState) => state.recipeSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  const [recipe, setRecipe] = useState(data.recipe)
  const [id, setId] = useState<string | undefined>('')
  const [imagePreviewList, setImageViewList] = useState<Image[]>([])
  const [imageSortableList, setImageSortableList] = useState<Image[]>([])
  const params = useParams()
  const hasURLParams = useRef(false)
  const formRef = useRef()
  const [btnClasses, setBtnClasses] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
  } = useForm()

  const onSave = async (data: any) => {
    dispatchEdit(data, recipe)
  }

  const dispatchEdit = async (data: any, recipe: any) => {
    // @ts-ignore:next-line
    await dispatch(updateRecipe({ id: recipe.id, ...recipe, ...data }))
    // navigate(`/recipes/${recipe.id}`)
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

    // can be destructured: {name, type}
    // const subscription = watch((value) => {
    //   setRecipe({ ...recipe, ...value })
    // })
    // return () => subscription.unsubscribe()
  }, [watch, recipe, id, recipes, params, imageSortableList, isDirty])

  const pushSelectedImage = (image: Image) => {
    setImageViewList((prevState: Image[]) => [...prevState, image])
  }

  const handleImageUpload = async (image: Image) => {
    const res = await uploadImageService(image)

    if (res.url) {
      setImageViewList((prevState: Image[]) => [
        ...prevState.filter((currentImage) => currentImage.data !== image.data),
      ])

      const uploadedImage: Image = {
        id: res.asset_id,
        name: res.public_id,
        url: res.url,
        width: res.width,
        height: res.height,
      }
      setImageSortableList((prevState: Image[]) =>
        [...prevState, uploadedImage].map((value, index) => {
          return { ...value, id: index }
        }),
      )
      setValue('images', [...imageSortableList, uploadedImage])
      handleSubmit(onSave)()
    } else {
      throw 'Error occurred'
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

  const dropDownHandler = async (course: string) => {
    await setValue('course', course)
    await handleSubmit(onSave)()
  }

  const courseName = (courseValue: string, options: Option[]): string => {
    const option = options.find((option) => {
      if (option.value && option.value === courseValue) return option
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
            Editing {recipe.name} - {courseName(recipe.course, options)}
          </h2>
          <div>{isLoading(status) && <Loader size={28} speed={2} />}</div>
        </div>

        <FieldContainer>
          <Textfield
            type="text"
            label="Recipe name*"
            name="name"
            defaultValue={recipe.name}
            placeholder="Fill in a name"
            validation={{
              required: 'Did you forget to name your recipe?',
            }}
            register={register}
            errors={errors.title?.type === 'required' && 'Title is required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Textarea
            label="Recipe description*"
            name="description"
            defaultValue={recipe.description}
            placeholder="Fill in a description"
            validation={{
              required: 'Did you forget to name your recipe?',
            }}
            register={register}
            errors={errors.title?.type === 'required' && 'Title is required'}
          />
        </FieldContainer>

        <FieldContainer>
          <Dropdown
            label="Course*"
            name="course"
            defaultValue={recipe.course}
            disabled={false}
            // validation={{
            //   required: 'Did you forget to fill in the course of your recipe?',
            // }}
            // register={register}
            // errors={errors.description?.type === 'required' && 'Course is required'}
            options={options}
            onChange={dropDownHandler}
          />
        </FieldContainer>

        <FieldContainer>
          <ImagePicker
            label="Drag 'n' drop some files here, or click to select files"
            name="images"
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

        <Button type="submit" label="Save recipe" classNames={btnClasses} />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>Back to recipe {recipe.name}</Link>
        )}
        <Link to={`/recipes`}>Back to recipes</Link>
      </form>
    </EditRecipeContainer>
  )
}

export default EditRecipe
