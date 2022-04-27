import { Image } from '../../../types/Image'

const ImagePreviewList = ({
  images,
  callbackUploadImages,
}: {
  images: Image[] | undefined
  callbackUploadImages: (image: any) => Promise<any>
}) => {
  return (
    <div>
      {images?.map((image, index) => {
        return (
          <div key={index}>
            <span>
              {image.name} - {image.size} bytes
            </span>
            <button
              type="button"
              onClick={() => callbackUploadImages(image)}
              className="bg-black text-white"
            >
              Upload
            </button>
          </div>
        )
      })}

      <br />
      <br />
    </div>
  )
}

export default ImagePreviewList
