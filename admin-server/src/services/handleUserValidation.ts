import { NextFunction, Request, Response } from 'express'
import validateJwt from './validateJwt'
import { HTTP_CODES } from '../constants'

const handleUserAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const { id, role } = await validateJwt(authorization)
      if (id) {
        if (role === 'Admin') {
          return next()
        } else if (
          // only allow validation of user, and get methods for basic roles
          (role === 'Basic' && req.method === 'GET') ||
          req.originalUrl.includes('/api/users/validate')
        ) {
          // allow all for admin roles
          return next()
        }
      }
    }
    res.status(HTTP_CODES.FORBIDDEN).send()
  } catch (error) {
    console.error(error)
    res.status(HTTP_CODES.FORBIDDEN).send()
  }
}

export default handleUserAuthentication
