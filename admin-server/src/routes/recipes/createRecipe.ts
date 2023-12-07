import express from 'express'
import { HTTP_CODES } from '../../constants'
import { createRecipe } from '../../models/recipes'

const router = express.Router()

// CREATE RECIPE
router.post('/api/recipes', async (req, res) => {
  try {
    const { name, description, authorId, course } = req.body
    const recipe = await createRecipe(name, description, authorId, course)
    if (!recipe) throw new Error('An error occurred')
    return res.status(HTTP_CODES.CREATED).send({ recipe })
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
  }
})

export default router
