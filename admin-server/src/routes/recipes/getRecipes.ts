import express from 'express'
import { HTTP_CODES } from '../../constants'
import { getRecipes } from '../../models/recipes'

const router = express.Router()

// GET RECIPES
router.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await getRecipes()
    res.status(200).send(recipes)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.NOT_FOUND).send([])
  }
})

export default router
