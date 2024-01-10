import express, { Request, Response } from 'express'
import { updateRecipe } from '../../models/recipes'
import { updateImage } from '../../models/images'
import { ERROR_MESSAGES, HTTP_CODES } from '../../constants'
import handleUserAuthentication from '../../services/handleUserValidation'

const router = express.Router()

// UPDATE RECIPE
router.put('/api/recipes/:id', handleUserAuthentication, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, authorId, course, published, numberOfPersons } = req.body
    const recipe = await updateRecipe(
      Number(id),
      name,
      description,
      authorId,
      course,
      published,
      numberOfPersons,
    )

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
