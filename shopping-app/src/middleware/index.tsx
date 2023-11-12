// src/middleware.ts

import type { APIContext } from "astro";
import jwt from "jsonwebtoken";
const jwtSecret: string = import.meta.env.JWT_SECRET as string;

const authenticatedRoutes = ["/"];

const isAuthRoute = (path: string): boolean => {
  return authenticatedRoutes.includes(path);
};

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

// Example: A simple authentication check in middleware.
export async function onRequest(context: APIContext, next: any) {
  const { cookies, request, url, site } = context;
  let isLoggedIn = false;
  // console.log(url, site);

  const token = cookies.get("jwt")?.value;
  if (token) {
    isLoggedIn = verifyJWT(token);
    if (isLoggedIn && url.pathname === "/user/login") return Response.redirect(new URL("/", context.url), 302);
  }

  if (isAuthRoute(url.pathname)) {
    if (token) {
      const res = verifyJWT(token);
      if (!res) {
        return Response.redirect(new URL("/user/login", context.url), 302);
      }
    } else {
      return Response.redirect(new URL("/user/login", context.url), 302);
    }
  }

  return next();
  // Check for the "sid" user session ID cookie.
  // Return a 405 (Not Allowed) if the cookie is missing.

  // console.log(jwt);

  // console.log(request);

  // if (!jwt) {
  //   return new Response(null, { status: 405 });
  // }
  // Use your own `getUser()` function to validate the user.
  // Return a 405 (Not Allowed) if the user isn't real.
  // const user = await getUser(sessionId);
  // if (!user) {
  //   return new Response(null, { status: 405 });
  // }
  // Attach the loaded user to the `locals` object.
  // Now, it can be read in the page route!
  // locals.user = user;
  // Return `next()` to return the response.
}
