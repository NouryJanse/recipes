import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  return new Response(
    JSON.stringify({
      message: "Welcome.",
    })
  );
};
