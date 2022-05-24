import LogHelper from '../../../../helpers/LogHelper'

const cloudinaryId: string = process.env.REACT_APP_CLOUDINARY_ID as string
const uploadPreset: string = process.env.REACT_APP_CLOUDINARY_PRESET_ID as string

const uploadImageService = async (image: ImageData): Promise<CloudinaryImage | false> => {
  try {
    if (!image.data || image.data === undefined || !cloudinaryId || !uploadPreset) {
      return false
    }

    const body = new FormData()
    body.append('file', image.data.toString())
    body.append('upload_preset', uploadPreset.toString())

    return await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryId.toString()}/image/upload`, {
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
    // WIP -> intention is to move this to the server with Cloudinary's Node.js package
    return true
  } catch (error) {
    LogHelper({ logType: 'error', message: 'An error occurred' })
    return false
  }
}

export { uploadImageService, deleteImageService }
