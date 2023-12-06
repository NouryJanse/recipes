import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Tokens from 'csrf'

import connectToDB from './services/mongoose'
import { User } from './services/User'
import { HTTP_CODES } from '../../constants'

const router = express.Router()
const tokens = new Tokens()
const jwtSecret = process.env.JWT_SECRET || ''
const csrfSecret: string = process.env.CSRF_SECRET as string

router.post('/api/users/login', async (req, res) => {
  await connectToDB()
  const { username, password, _csrf } = req.body

  // if (!_csrf || (_csrf && !tokens.verify(csrfSecret, _csrf))) {
  //   return new Response(
  //     JSON.stringify({
  //       message: 'Login not succesful',
  //     }),
  //   )
  // }

  if (!username || !password) {
    return res.status(500).send()
  }

  try {
    const user = await User.findOne({ username })
    if (!user) {
      // return new Response(
      //   JSON.stringify({
      //     message: 'Login not successful',
      //     error: 'User not found',
      //   }),
      // )
      console.log('no user')
    } else {
      const compare = await bcrypt.compare(password, user.password)

      if (compare) {
        const maxAge = 3 * 60 * 60
        const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
          expiresIn: maxAge, // 3hrs in sec
        })

        res.cookie('jwt', token, {
          path: '/',
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        })
        return res.status(200).send({ id: user.id })
      }
      return res.status(500).send()
    }
  } catch (error: any) {
    console.log('error')
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
  }
})

export default router
