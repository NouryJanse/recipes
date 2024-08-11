import express, { Request, Response } from 'express'
import { HTTP_CODES } from '../../constants'
import handleUserAuthentication from '../../services/handleUserValidation'

const router = express.Router()

// UPDATE USER
router.put('/api/users', handleUserAuthentication, async (req: Request, res: Response) => {
    try {
        // await connectToDB()
        // const { id, role } = req.body
        // if (role && id) {
        //   if (role === 'admin') {
        //     const user = await User.findById(id)
        //     if (user && user.role !== 'admin') {
        //       user.role = role
        //       await user.save()
        //     } else {
        //       res.status(HTTP_CODES.NOT_ALLOWED).json({ message: 'User is already an Admin' })
        //     }
        //   } else {
        //     res.status(400).json({
        //       message: 'Role is not admin',
        //     })
        //   }
        // } else {
        //   res.status(HTTP_CODES.NOT_FOUND).json({ message: 'Role or Id not present' })
        // }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred',
                error: error.message,
            })
        }
    }
})

export default router
