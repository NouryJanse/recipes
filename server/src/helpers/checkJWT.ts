import { auth } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
});

export default checkJwt;
