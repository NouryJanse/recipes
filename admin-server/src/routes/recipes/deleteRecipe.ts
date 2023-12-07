import express from 'express'
import { deleteRecipe } from '../../models/recipes'
import { HTTP_CODES } from '../../constants'

const router = express.Router()

// DELETE RECIPE
router.delete('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteRecipe(Number(id))
    return res.status(HTTP_CODES.OK).send(result)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({})
  }
})

export default router
