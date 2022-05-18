import LogHelper from '../../../../helpers/LogHelper'
import { ImageData } from '../../../../types/ImageData'

const uploadImageService = async (image: ImageData): Promise<CloudinaryImage | false> => {
  try {
    if (!image.data || image.data === undefined) {
      return false
    }
    const body = new FormData()
    body.append('file', image.data)
    body.append('upload_preset', 'ej4yq8qc')
    return await fetch('https://api.cloudinary.com/v1_1/dqnks1cyu/image/upload', {
      method: 'POST',
      body,
    }).then((r) => r.json())
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

export default uploadImageService
