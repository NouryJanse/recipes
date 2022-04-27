import { Image } from '../../../../types/Image'

const uploadImageService = async (image: Image): Promise<any> => {
  // return {
  //   access_mode: 'public',
  //   asset_id: 'a8882ca9540969d650db4c091e9b4274awegawe',
  //   bytes: 14408,
  //   created_at: '2022-04-27T12:38:04Z',
  //   etag: 'd1ab0b8446a34df20eb7ddf54a31f918',
  //   folder: 'recipes',
  //   format: 'png',
  //   height: 314,
  //   placeholder: false,
  //   public_id: 'recipes/hjoc43kesy2vkmd2pt4p',
  //   resource_type: 'image',
  //   secure_url:
  //     'https://res.cloudinary.com/dqnks1cyu/image/upload/v1651063084/recipes/hjoc43kesy2vkmd2pt4p.png',
  //   signature: 'a34325e227d46e8d42d3081551ba6f3f56a00dd5',
  //   tags: [],
  //   type: 'upload',
  //   url: 'http://res.cloudinary.com/dqnks1cyu/image/upload/v1651063084/recipes/hjoc43kesy2vkmd2pt4p.png',
  //   version: 1651063084,
  //   version_id: '3b6fe2f546e44fdbfb702ecc610e5166',
  //   width: 436,
  // }
  try {
    if (!image.data || image.data === undefined) {
      throw 'No image data provided'
    }
    const body = new FormData()
    body.append('file', image.data)
    body.append('upload_preset', 'ej4yq8qc')
    return await fetch('https://api.cloudinary.com/v1_1/dqnks1cyu/image/upload', {
      method: 'POST',
      body,
    }).then((r) => r.json())
  } catch (error) {
    console.error(error)
    return false
  }
}

export { uploadImageService }
