import jwt, { type JwtPayload } from "jsonwebtoken";
const jwtSecret: string = import.meta.env.JWT_SECRET as string;

const verifyJWT = (token: string): boolean | jwt.JwtPayload => {
  try {
    // @ts-ignore
    if (token) {
      const res: JwtPayload = jwt.verify(token, jwtSecret);
      if (res) {
        return res;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default verifyJWT;
