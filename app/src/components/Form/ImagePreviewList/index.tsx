import { ImageData } from '../../../types/ImageData'
import { Button } from '../../'

interface ImagePreviewListProps {
  images: ImageData[] | undefined
  callbackUploadImages: (image: any) => Promise<any>
}

const ImagePreviewList = ({ images, callbackUploadImages }: ImagePreviewListProps) => {
  return (
    <div>
      {images?.map((image, index) => {
        return (
          <div key={index}>
            <span>
              {image.name} - {image.size} bytes
            </span>
            <img src={image.data} alt="title" />
            <Button
              type="button"
              label={`Upload to CDN`}
              onClick={() => callbackUploadImages(image)}
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
