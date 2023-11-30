import jwt, { type JwtPayload } from "jsonwebtoken";
const jwtSecret: string = import.meta.env.JWT_SECRET as string;

const verifyJWT = (token: string): boolean | string | jwt.JwtPayload => {
  try {
    // @ts-ignore
    if (token) {
      const res: string | JwtPayload = jwt.verify(token, jwtSecret);
      return res;
    }
    throw Error("No token provided");
  } catch (error) {
    return false;
  }
};

export default verifyJWT;
