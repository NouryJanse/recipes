import React, { ReactElement } from 'react'
import { ImageData } from '../../../types/ImageData'
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
          <div key={image.name}>
            <span>
              {image.name} - {image.size} bytes
            </span>
            <img src={image.data} alt="title" />
            <Button
              type="button"
              label="Upload to CDN"
              onClick={(): Promise<void> => callbackUploadImages(image)}
              // classNames="bg-black text-white"
            />
          </div>
        )
      })}

      <br />
      <br />
    </div>
  )
}

export default ImagePreviewList
