import React, { ReactElement } from 'react'
import { Button } from '../../..'

interface ImagePreviewListProps {
  images: ImageData[] | undefined
  callbackUploadImages: (image: ImageData) => Promise<void>
}

const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
  images,
  callbackUploadImages,
}): ReactElement => {
  const bytesToSize = (bytes: number): string => {
    const units = ['byte', 'kilobyte', 'megabyte', 'terabyte', 'petabyte']
    const unit = Math.floor(Math.log(bytes) / Math.log(1024))
    return new Intl.NumberFormat('en', { style: 'unit', unit: units[unit] }).format(
      bytes / 1024 ** unit,
    )
  }

  const formatImageSize = (imageSize: number | string | undefined): string | false => {
    if (imageSize && !Number.isNaN(imageSize)) {
      return bytesToSize(Number(imageSize))
    }
    return false
  }

  return (
    <div>
      {images?.map((image) => {
        return (
          <div key={image.name} className="mb-6">
            <span>
              {image.name} - {formatImageSize(image.size)}
            </span>

            <img src={image.data.toString()} alt="title" className="mb-2 max-w-lg" loading="lazy" />

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
