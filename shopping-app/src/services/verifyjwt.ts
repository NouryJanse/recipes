import jwt from "jsonwebtoken";
const jwtSecret: string = import.meta.env.JWT_SECRET as string;

const verifyJWT = (token: string): boolean => {
  // @ts-ignore
  return jwt.verify(token, jwtSecret, (err: any, decodedToken: any): any => {
    if (err) {
      return false;
    } else {
      if (decodedToken.role !== "Basic") {
        return false;
      } else {
        return true;
      }
    }
  });
};

export default verifyJWT;
