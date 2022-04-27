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
} from '../../components/index'
import { useState } from 'react'
import { useRef } from 'react'
import RootState from '../../types/RootState'

import styled from 'styled-components'

const EditRecipeContainer = styled.div`
  margin-bottom: 32px;
`

// should be moved to fixed constants externally
const options = [
  { title: 'Make a choice', name: 'choice' },
  { title: 'Breakfast', name: 'breakfast' },
  { title: 'Lunch', name: 'lunch' },
  { title: 'Aperitivo', name: 'aperitivo' },
  { title: 'Dinner', name: 'dinner' },
]

const EditRecipe = (data: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [initialRecipeLoad, setInitialRecipeLoad] = useState(false)
  let [recipe, setRecipe] = useState(data.recipe)
  let [id, setId] = useState<string | undefined>('')
  let [imagePreviewList, setImageViewList] = useState<Image[]>([])
  let [imageSortableList, setImageSortableList] = useState<Image[]>([])
  let params = useParams()
  const hasURLParams = useRef(false)
  const recipes = useSelector((state: RootState) => state.recipeSlice.data.recipes)
  const formRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    trigger,
  } = useForm()

  const onSave = async (data: any) => {
    dispatchEdit(data, recipe)
  }

  const dispatchEdit = async (data: any, recipe: any) => {
    // @ts-ignore:next-line
    await dispatch(updateRecipe({ id: recipe.id, ...recipe, ...data }))
    // navigate(`/recipes/${recipe.id}`)
  }

  const recipeCourse = () => {
    return options.find((option) => option?.name === recipe.course)?.title
  }

  useEffect(() => {
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
  }, [watch, recipe, id, recipes, params, imageSortableList])

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

  if (!recipe) return <p>Error, no recipe found or still loading the recipe from the server.</p>

  return (
    <EditRecipeContainer>
      <form onSubmit={handleSubmit(onSave)} {...formRef}>
        <h2>
          Editing {recipe.name} - {recipeCourse()}
          {isDirty && 'yes'}
        </h2>

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

        <Dropdown
          label="Course*"
          name="course"
          placeholder="Fill in the course"
          defaultValue={recipe.course}
          validation={{
            required: 'Did you forget to fill in the course of your recipe?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Course is required'}
          options={options}
        />

        <ImagePicker
          label="Drag 'n' drop some files here, or click to select files"
          name="images"
          register={register}
          validation={{
            required: 'Did you forget to add images to your recipe?',
          }}
          onSelectedImageCallback={pushSelectedImage}
        />

        {!!imagePreviewList.length && (
          <ImagePreviewList images={imagePreviewList} callbackUploadImages={handleImageUpload} />
        )}

        {!!imageSortableList.length && (
          <ImageSortableList images={imageSortableList} callbackSortedImages={handleSortedImages} />
        )}

        <Button type="submit" label="Save recipe" />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>Back to recipe {recipe.name}</Link>
        )}
        <Link to={`/recipes`}>Back to recipes</Link>
      </form>
    </EditRecipeContainer>
  )
}

export default EditRecipe
