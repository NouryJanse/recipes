import express, { Request, Response } from 'express'
import { HTTP_CODES } from '../../constants'
import { deleteImage } from '../../models/images'
import handleUserAuthentication from '../../services/handleUserValidation'

const router = express.Router()

// DELETE RECIPE IMAGE
router.delete(
  '/api/recipes/image',
  handleUserAuthentication,
  async (req: Request, res: Response) => {
    try {
      const { imageId } = req.body
      const response = await deleteImage(imageId.toString())
      return res.status(HTTP_CODES.OK).send({ response })
    } catch (error) {
      console.error(error)
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
    }
  },
)

export default router
