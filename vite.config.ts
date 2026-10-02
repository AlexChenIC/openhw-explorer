import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const publicDir = new URL("./public/", import.meta.url).pathname;
const audioSizes = Object.fromEntries(
  readdirSync(join(publicDir, "classroom-assets"), { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".mp3"))
    .map((file) => [
      `/classroom-assets/${file}`,
      statSync(join(publicDir, "classroom-assets", file)).size,
    ]),
);

export default defineConfig({
  define: { __OPENHW_AUDIO_SIZES__: JSON.stringify(audioSizes) },
  resolve: {
    alias: { "next-intl/config": new URL("./src/lib/i18n.ts", import.meta.url).pathname },
  },
  plugins: [
    vinext({
      cache: { cdn: staticAssetsAdapter() },
      prerender: { routes: "*" },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
