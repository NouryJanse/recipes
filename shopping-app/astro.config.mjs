import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
// import vercel from "@astrojs/vercel/serverless";
// import netlify from "@astrojs/netlify/functions";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [preact()],
  prefetch: true,
  // adapter: netlify(),
});
