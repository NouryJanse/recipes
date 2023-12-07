import express from 'express'
import { HTTP_CODES } from '../../constants'
import { deleteImage } from '../../models/images'

const router = express.Router()

// DELETE RECIPE IMAGE
router.delete('/api/recipes/image', async (req, res) => {
  try {
    const { imageId } = req.body
    await deleteImage(imageId.toString())
    return res.status(HTTP_CODES.OK).send({})
  } catch (error) {
    console.error('An error occurred')
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
