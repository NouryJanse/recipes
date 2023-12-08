import express, { Request, Response } from 'express'

import connectToDB from './services/mongoose'
import { User } from './services/User'
import { HTTP_CODES } from '../../constants'
import handleUserAuthentication from '../../services/handleUserValidation'

const router = express.Router()

router.delete('/api/users', handleUserAuthentication, async (req: Request, res: Response) => {
  try {
    await connectToDB()
    const { id } = req.body
    const user = await User.findById(id)
    if (user) {
      await user.deleteOne()
      res.status(HTTP_CODES.OK).send('User delete')
    }
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send('Error')
  } catch (error) {
    res.status(500).send()
  }
})

export default router
