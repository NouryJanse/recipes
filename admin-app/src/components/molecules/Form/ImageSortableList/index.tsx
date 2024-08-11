import React, { ReactElement } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import Button from '../../../atoms/Button'
import ImageComponent from '../../../atoms/Image'

type ImageSortableListProps = {
    images: Image[]
    callbackSortedImages: (images: Image[]) => void
    onDelete: (imageId: string) => void
}

const ImageSortableList: React.FC<ImageSortableListProps> = ({
    images,
    callbackSortedImages,
    onDelete,
}: ImageSortableListProps): ReactElement => {
    const handleOnDragEnd = (result: DropResult): boolean => {
        if (!result.destination) return false
        const items: Image[] = Array.from(images)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        callbackSortedImages(items)
        return true
    }

    return (
        <div>
            {!!images.length && (
                <>
                    <span className="block mb-2">
                        Sort your inspirational images ({images.length}) here:
                    </span>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="images">
                            {(provided): ReactElement => (
                                <ul
                                    className="images"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {images.map(
                                        (
                                            {
                                                id,
                                                url,
                                                cloudinaryPublicId,
                                            }: {
                                                id: number
                                                url: string
                                                cloudinaryPublicId: string
                                            },
                                            index: number,
                                        ) => {
                                            return (
                                                <Draggable
                                                    key={id}
                                                    draggableId={id.toString()}
                                                    index={index}
                                                >
                                                    {(providedTwo): ReactElement => (
                                                        <li
                                                            ref={providedTwo.innerRef}
                                                            {...providedTwo.draggableProps}
                                                            {...providedTwo.dragHandleProps}
                                                            className="inline-flex mr-8"
                                                        >
                                                            <div className="max-w-xs mb-8">
                                                                <div className="mb-2">
                                                                    <ImageComponent
                                                                        alt="alt-text"
                                                                        src={url}
                                                                        width={200}
                                                                        height={100}
                                                                    />
                                                                </div>

                                                                <Button
                                                                    type="button"
                                                                    label="Delete"
                                                                    onClick={(): void =>
                                                                        onDelete(cloudinaryPublicId)
                                                                    }
                                                                />
                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                                        },
                                    )}

                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            )}
        </div>
    )
}

export default ImageSortableList
