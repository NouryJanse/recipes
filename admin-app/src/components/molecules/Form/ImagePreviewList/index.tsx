import React, { ReactElement } from 'react'
import { Button } from '../../..'
import { formatImageSize } from './helpers'

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
                            {image.name} - {formatImageSize(image.size)}
                        </span>

                        <img
                            src={image.data.toString()}
                            alt="title"
                            className="mb-2 max-w-full xl:max-w-md"
                            loading="lazy"
                        />

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
