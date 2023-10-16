import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { createRecipeImage, deleteRecipeImage, getRecipe } from '../../../../redux/reducers/recipes/recipeSlice'
import FieldContainer from '../../../molecules/Form/FieldContainer'
import ImagePicker from '../../../molecules/Form/ImagePicker'
import ImagePreviewList from '../../../molecules/Form/ImagePreviewList'
import ImageSortableList from '../../../molecules/Form/ImageSortableList'

type ImagesType = {
  register: UseFormRegister<FieldValues>
  recipe: Recipe
  setValue: UseFormSetValue<FieldValues>
  setInitialRecipeLoad: React.Dispatch<React.SetStateAction<boolean>>
  initialRecipeLoad: boolean
}

const Images: React.FC<ImagesType> = ({
  register,
  recipe,
  setValue,
  setInitialRecipeLoad,
  initialRecipeLoad,
}): ReactElement => {
  const dispatch = useDispatch()
  const [imagePreviewList, setImageViewList] = useState<ImageData[]>([])
  const [imageSortableList, setImageSortableList] = useState<Image[]>([])

  useEffect(() => {
    if (recipe && recipe.images && !initialRecipeLoad) {
      setImageSortableList(recipe?.images ? recipe.images : [])
      setInitialRecipeLoad(true)
    } else if (recipe && !recipe.images && !initialRecipeLoad) {
      setImageSortableList([])
    }
  }, [recipe])

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
  }

  const deleteImage = async (imageId: string): Promise<void> => {
    // @ts-ignore:next-line
    await dispatch(deleteRecipeImage(imageId))
    // @ts-ignore:next-line
    await dispatch(getRecipe(recipe.id))
    setInitialRecipeLoad(false)
  }

  return (
    <div>
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
    </div>
  )
}

export default Images
