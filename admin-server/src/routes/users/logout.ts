import express from 'express'

const router = express.Router()

// LOGOUT USER
router.post('/api/users/logout', async (req, res) => {
  res.cookie('jwt', '', {
    path: '/',
    maxAge: 1,
  })
  res.status(200).send()
})

export default router
