import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
// import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";
// import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  // adapter: netlify(),
  adapter: node({
    mode: "standalone",
  }),
  integrations: [preact()],
  prefetch: true,
});
