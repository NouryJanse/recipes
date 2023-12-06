import express from 'express'
import connectToDB from './services/mongoose'
import { User } from './services/User'
import { HTTP_CODES } from '../../constants'

const router = express.Router()

// UPDATE USER
router.put('/api/users', async (req, res) => {
  try {
    await connectToDB()
    const { id, role } = req.body

    if (role && id) {
      if (role === 'admin') {
        const user = await User.findById(id)

        if (user && user.role !== 'admin') {
          user.role = role
          await user.save()
        } else {
          res.status(400).json({ message: 'User is already an Admin' })
        }
      } else {
        res.status(400).json({
          message: 'Role is not admin',
        })
      }
    } else {
      res.status(400).json({ message: 'Role or Id not present' })
    }
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ message: 'An error occurred', error: error.message })
  }
})

export default router
