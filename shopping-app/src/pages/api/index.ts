import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: "Welcome.",
    })
  );
};
