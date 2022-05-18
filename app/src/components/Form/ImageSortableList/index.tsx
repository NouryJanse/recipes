import React, { ReactElement } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import Image from '../../../types/Image'
import Button from '../../Button'
import ImageComponent from '../../Image'

type ImageSortableListProps = {
  images: Image[]
  callbackSortedImages: (images: Image[]) => void
}

const ImageSortableList: React.FC<ImageSortableListProps> = ({
  images,
  callbackSortedImages,
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
        <div>
          Sort your images ({images.length}) here:
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="images">
              {(provided): ReactElement => (
                <ul className="images" {...provided.droppableProps} ref={provided.innerRef}>
                  {images.map(({ id, url }: { id: number; url: string }, index: number) => {
                    return (
                      <Draggable key={id} draggableId={id.toString()} index={index}>
                        {(providedTwo): ReactElement => (
                          <li
                            ref={providedTwo.innerRef}
                            {...providedTwo.draggableProps}
                            {...providedTwo.dragHandleProps}
                          >
                            <div className="max-w-xs mb-8">
                              <ImageComponent alt="alt-text" src={url} width={200} height={100} />
                              {/* <Button type="button" label="x" onClick={}/> */}
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  )
}

export default ImageSortableList
