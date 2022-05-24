import React, { ReactElement } from 'react'
import { Button } from '../..'

interface ImagePreviewListProps {
  images: ImageData[] | undefined
  callbackUploadImages: (image: ImageData) => Promise<void>
}

const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
  images,
  callbackUploadImages,
}): ReactElement => {
  return (
    <div>
      {images?.map((image) => {
        return (
          <div key={image.name} className="mb-6">
            <span>
              {image.name} - {image.size} bytes
            </span>

            <img src={image.data.toString()} alt="title" className="mb-2" />

            <Button
              type="button"
              label="Upload to CDN"
              onClick={(): Promise<void> => callbackUploadImages(image)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImagePreviewList
