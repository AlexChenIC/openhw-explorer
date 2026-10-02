import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "dist/**",
    ".wrangler/**",
    "cloudflare-env.d.ts",
  ]),
  ...nextCoreWebVitals,
  prettier,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);
