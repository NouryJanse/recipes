import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import FieldContainer from '../../../molecules/Form/FieldContainer'
import ImagePicker from '../../../molecules/Form/ImagePicker'
import ImagePreviewList from '../../../molecules/Form/ImagePreviewList'
import ImageSortableList from '../../../molecules/Form/ImageSortableList'
import {
    useCreateRecipeImageMutation,
    useDeleteRecipeImageMutation,
    useGetRecipeQuery,
} from '../../../../redux/reducers/recipes/recipes'

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
    const [imagePreviewList, setImageViewList] = useState<ImageData[]>([])
    const [imageSortableList, setImageSortableList] = useState<Image[]>([])
    const [createRecipeImage, {}] = useCreateRecipeImageMutation()
    const [deleteRecipeImage, {}] = useDeleteRecipeImageMutation()
    const { refetch } = useGetRecipeQuery(recipe.id)

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
        await createRecipeImage({ image, id: recipe.id })
        refetch()
        setInitialRecipeLoad(false)
        setImageSortableList(recipe?.images ? recipe.images : [])
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
                <ImagePreviewList
                    images={imagePreviewList}
                    callbackUploadImages={handleImageUpload}
                />
            )}

            {!!imageSortableList.length && (
                <ImageSortableList
                    images={imageSortableList}
                    callbackSortedImages={handleSortedImages}
                    onDelete={async (imageId: string) => {
                        // @ts-ignore:next-line
                        await deleteRecipeImage({ imageId })
                        setInitialRecipeLoad(false)
                    }}
                />
            )}
        </div>
    )
}

export default Images
