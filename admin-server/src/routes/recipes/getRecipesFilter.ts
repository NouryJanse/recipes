import express, { Request, Response } from 'express'
import { HTTP_CODES } from '../../constants'
import { getRecipes } from '../../models/recipes'

const router = express.Router()

// function sleep(ms: number) {
//   return new Promise((resolve) => setInterval(resolve, ms))
// }

// GET RECIPES FILTER
router.get('/api/recipes/filter/:filter', async (req: Request, res: Response) => {
    const { filter } = req.params
    try {
        const recipes = await getRecipes(filter)
        return res.status(200).send(recipes)
    } catch (error) {
        console.error(error)
        return res.status(HTTP_CODES.NOT_FOUND).send([])
    }
})

export default router
