import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import connectToDB from './services/mongoose'
import { User } from './services/User'
import { HTTP_CODES } from '../../constants'

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET || ''

// REGISTER USER
router.post('/api/users', async (req, res) => {
    try {
        await connectToDB()
        const { username, password } = req.body

        if (!password || password.length < 6) {
            return res.status(500).send({ message: 'Password less than 6 characters' })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            password: hash,
        })

        if (user) {
            const maxAge = 3 * 60 * 60
            const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
                expiresIn: maxAge, // 3hrs in sec
            })
            return res.status(HTTP_CODES.OK).send({ id: user.id, token })
        }
        return res.status(500).send()
    } catch (error: unknown) {
        console.error(error)
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send()
    }
})

export default router
