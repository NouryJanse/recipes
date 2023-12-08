import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import connectToDB from './services/mongoose'
import { User } from './services/User'
import { HTTP_CODES } from '../../constants'

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET || ''

router.post('/api/users/login', async (req, res) => {
  try {
    await connectToDB()
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(500).send()
    }
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(HTTP_CODES.FORBIDDEN).send()
    } else {
      const compare = await bcrypt.compare(password, user.password)

      if (compare) {
        const maxAge = 3 * 60 * 60
        const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
          expiresIn: maxAge, // 3hrs in sec
        })
        return res.status(HTTP_CODES.OK).send({ id: user.id, token })
      }
      return res.status(500).send({ message: 'An error occurred.' })
    }
  } catch (error: any) {
    console.error('error')
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ error })
  }
})

export default router
