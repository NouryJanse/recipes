import type { APIContext } from "astro";
import verifyJWT from "../src/services/verifyjwt";

const authenticatedRoutes = ["/"];

const isAuthRoute = (path: string): boolean => {
  return authenticatedRoutes.includes(path);
};

export async function onRequest(context: APIContext, next: any) {
  const { cookies, request, url, site } = context;
  let isLoggedIn = false;
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
}
