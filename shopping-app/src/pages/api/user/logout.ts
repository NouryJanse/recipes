import type { APIRoute } from "astro";

// auth.js
export const POST: APIRoute = async ({ cookies, redirect }) => {
  try {
    cookies.set("jwt", "", {
      path: "/",
      maxAge: 1,
    });

    return redirect("/user/login");
  } catch (error) {
    console.error(error);
    return redirect("/user/login");
  }
};
