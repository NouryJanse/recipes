import LogHelper from '../../../../helpers/LogHelper'

const uploadImageService = async (image: ImageData): Promise<CloudinaryImage | false> => {
  try {
    if (!image.data || image.data === undefined) {
      return false
    }
    const body = new FormData()
    body.append('file', image.data.toString())
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

const deleteImageService = async (_imageId: number): Promise<boolean> => {
  try {
    // WIP
    return true
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

export { uploadImageService, deleteImageService }
