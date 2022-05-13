import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Image } from '../../../types/Image'
import Button from '../../Button'
import ImageComponent from '../../Image'

interface ImageSortableListProps {
  images: Image[]
  callbackSortedImages: (images: Image[]) => void
}

const ImageSortableList = ({ images, callbackSortedImages }: ImageSortableListProps) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items: Image[] = Array.from(images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    callbackSortedImages(items)
  }

  return (
    <div>
      {!!images.length && (
        <div>
          Sort your images ({images.length}) here:
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="images">
              {(provided) => (
                <ul className="images" {...provided.droppableProps} ref={provided.innerRef}>
                  {images.map(({ id, url }: { id: number; url: string }, index: number) => {
                    return (
                      <Draggable key={id} draggableId={id.toString()} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="max-w-xs mb-8">
                              <ImageComponent src={url} width={200} height={100} />
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
