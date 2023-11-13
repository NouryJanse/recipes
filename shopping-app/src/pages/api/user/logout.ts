import type { APIRoute } from "astro";

// auth.js
export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.set("jwt", "", {
    path: "/",
    maxAge: 1,
  });

  return redirect("/user/login");
};
