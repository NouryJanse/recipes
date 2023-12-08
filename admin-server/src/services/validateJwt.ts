import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET || ''

const validateJwt = async (token: string) => {
  return await (<jwt.JwtPayload>jwt.verify(token.replace('Bearer ', ''), jwtSecret))
}

export default validateJwt
