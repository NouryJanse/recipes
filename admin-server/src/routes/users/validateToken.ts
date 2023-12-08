import express from 'express'
import { HTTP_CODES } from '../../constants'
import handleUserAuthentication from '../../services/handleUserValidation'
import connectToDB from './services/mongoose'
import { User } from './services/User'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/validate', handleUserAuthentication, async (req, res) => {
  try {
    const { authorization: token } = req.headers
    if (token) {
      await connectToDB()
      const { username } = <jwt.JwtPayload>jwt.decode(token.replace('Bearer ', ''))
      const { id, role } = await User.findOne({ username })
      return res.status(200).send({ authenticated: true, id, username, role })
    }
  } catch (error: any) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ authenticated: false })
  }
})

export default router
