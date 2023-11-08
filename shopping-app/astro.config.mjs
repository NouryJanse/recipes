import { defineConfig } from "astro/config";
import nodejs from "@astrojs/node";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: nodejs({
    mode: "standalone",
  }),
  integrations: [preact()],
});
