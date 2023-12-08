import express, { Request, Response } from 'express'
import { HTTP_CODES } from '../../constants'
import { createRecipe } from '../../models/recipes'
import validateJwt from '../../services/validateJwt'
import handleUserAuthentication from '../../services/handleUserValidation'

const router = express.Router()

// CREATE RECIPE
router.post('/api/recipes', handleUserAuthentication, async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(HTTP_CODES.NOT_AUTHORISED).send('No token provided')
    }
    const valid = await validateJwt(authorization)
    if (valid) {
      const { name, description, authorId, course } = req.body
      const recipe = await createRecipe(name, description, authorId, course)
      if (!recipe) throw new Error('An error occurred')
      return res.status(HTTP_CODES.CREATED).send({ recipe })
    }
    return res.status(HTTP_CODES.NOT_AUTHORISED).send()
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
  }
})

export default router
