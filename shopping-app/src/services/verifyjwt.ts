import jwt from "jsonwebtoken";
const jwtSecret: string = import.meta.env.JWT_SECRET as string;

const verifyJWT = (token: string): boolean | string | jwt.JwtPayload => {
  try {
    // @ts-ignore
    if (token) {
      return jwt.verify(token, jwtSecret);
    }
    throw Error("No token provided");
  } catch (error) {
    return false;
  }
};

export default verifyJWT;
