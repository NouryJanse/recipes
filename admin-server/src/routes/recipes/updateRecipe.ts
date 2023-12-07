import express from 'express'
import { getRecipe, updateRecipe } from '../../models/recipes'
import { updateImage } from '../../models/images'
import { formatRecipeImages } from '../../helpers'
import { ERROR_MESSAGES, HTTP_CODES } from '../../constants'

const router = express.Router()

// UPDATE RECIPE
router.put('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, authorId, course, published } = req.body
    const recipe = await updateRecipe(Number(id), name, description, authorId, course, published)

    if (req.body.images && req.body.images.length) {
      const promises = req.body.images.map(async (image: any) => {
        return updateImage(image)
      })
      await Promise.all(promises)
        .then((response) => {
          return response
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (recipe && recipe.id) {
      return res.status(HTTP_CODES.CREATED).send()
    }
    return res.status(HTTP_CODES.NOT_FOUND).send({})
  } catch (error) {
    console.error(error)
    return res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
  }
})

export default router
