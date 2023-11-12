import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
// import netlify from "@astrojs/netlify/functions";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [preact()],
  prefetch: true,
});
