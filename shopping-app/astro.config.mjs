import { defineConfig } from "astro/config";
// import nodejs from "@astrojs/node";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [preact()],
});
