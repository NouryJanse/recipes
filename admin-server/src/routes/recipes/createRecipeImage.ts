import express from 'express'
import { Image } from '@prisma/client'
import { createImage } from '../../models/images'
import { HTTP_CODES } from '../../constants'

const router = express.Router()

// CREATE RECIPE IMAGE
router.post('/api/recipes/image/:id', async (req, res) => {
  try {
    const recipeId = +req.params.id
    if (req.body.image.data) {
      const image: Image | false = await createImage(req.body.image.data, recipeId)
      if (image) {
        return res.status(HTTP_CODES.CREATED).send(image)
      }
    }
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
