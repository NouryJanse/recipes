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

// REGISTER USER
router.post('/api/users', async (req, res) => {
  try {
    await connectToDB()
    const { username, password, _csrf } = req.body

    // if (!_csrf || (_csrf && !tokens.verify(csrfSecret, _csrf))) {
    //   return new Response(
    //     JSON.stringify({
    //       message: "Registration not successful",
    //     }),
    //   )
    // }

    if (!password || password.length < 6) {
      return res.status(500).send('Password less than 6 characters')
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      password: hash,
    })

    const maxAge = 3 * 60 * 60

    const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
      expiresIn: maxAge, // 3hrs in sec
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    })

    if (user) {
      return res.status(200).send()
    } else {
      return res.status(500).send()
    }
  } catch (error: any) {
    console.error(error)
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
  }
})

export default router
