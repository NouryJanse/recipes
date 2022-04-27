import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Image } from '../../../types/Image'

const ImageSortableList = ({
  images,
  callbackSortedImages,
}: {
  images: any
  callbackSortedImages: (images: Image[]) => void
}) => {
  const handleOnDragEnd = (result: any) => {
    console.log(result)
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
                  {images.map(({ id, path, size, name, url }: any, index: any) => {
                    return (
                      <Draggable key={id} draggableId={id.toString()} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>
                              <p>
                                {path} {size}
                              </p>
                              <p>
                                {id} {name} {url}
                              </p>
                              <img src={url} />
                            </div>
                            <br />
                            <br />
                            <br />
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
