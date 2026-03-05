#!/usr/bin/env node

import { existsSync } from "fs";
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_FILE = join(ROOT, "src/data/github-stats.json");
const FETCH_SCRIPT = join(ROOT, "scripts/fetch-github-data.mjs");

const hasToken = Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim().length > 0);

if (!hasToken) {
  if (existsSync(OUTPUT_FILE)) {
    console.log("[prebuild] GITHUB_TOKEN is not set. Using cached src/data/github-stats.json.");
    process.exit(0);
  }

  console.error("[prebuild] GITHUB_TOKEN is not set and no cached github stats file exists.");
  console.error("[prebuild] Run npm run fetch-data with a valid GITHUB_TOKEN first.");
  process.exit(1);
}

const result = spawnSync("node", [FETCH_SCRIPT], {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
