import { cp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const stage = join(root, "build/pages-source");
const output = join(root, "out");
const env = {
  ...process.env,
  NEXT_PUBLIC_DEPLOYMENT_PREVIEW: "1",
  NEXT_PUBLIC_VERCEL_ANALYTICS: "0",
};
// This target mirrors the currently authorized public-preview scope.
if (env.NEXT_PUBLIC_ENABLE_INDUSTRY_LANDSCAPE === "true") {
  throw new Error("Pages preview requires the Industry feature to remain disabled.");
}
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const path of [
  "src",
  "messages",
  "public",
  "package.json",
  "package-lock.json",
  "next.config.js",
  "postcss.config.cjs",
  "tsconfig.json",
]) {
  await cp(join(root, path), join(stage, path), { recursive: true });
}
await symlink(join(root, "node_modules"), join(stage, "node_modules"), "dir");
await cp(join(stage, "next.config.js"), join(stage, "next.base.config.js"));
await writeFile(
  join(stage, "next.config.js"),
  `import base from "./next.base.config.js";
export default {
  ...base,
  outputFileTracingRoot: import.meta.dirname,
  output: "export",
  redirects: undefined,
  headers: undefined,
  images: { ...base.images, unoptimized: true },
};
`,
);
// These server-only routes are replaced by Pages redirects and its static 404.
// Work on the staged copy so normal Next.js and Workers builds are untouched.
for (const path of [
  "src/proxy.ts",
  "src/app/[locale]/[...rest]",
  "src/app/[locale]/resources/industry",
]) {
  await rm(join(stage, path), { recursive: true, force: true });
}
const manifestDir = join(stage, "src/app/pages-build-manifest");
await mkdir(manifestDir, { recursive: true });
await writeFile(
  join(manifestDir, "route.ts"),
  `
import { classroomSeries, getClassroomIdForLocale } from "@/data/classrooms";
import {
  getPublicSeriesById, getPublicLessonById, getPublicLessonByClassroomId,
} from "@/data/classroom-publication";
export const dynamic = "force-static";
export function GET() {
  const redirects: string[] = ["/ /en 307"];
  for (const locale of ["en", "zh"]) {
    const hub = "/" + locale + "/classroom";
    redirects.push("/" + locale + "/resources/industry /" + locale + "/resources 307");
    for (const series of classroomSeries) {
      const seriesPath = hub + "/" + series.id;
      if (!getPublicSeriesById(series.id)) redirects.push(seriesPath + " " + hub + " 307");
      for (const lesson of series.lessons) {
        if (!getPublicLessonById(series.id, lesson.id)) {
          redirects.push(seriesPath + "/" + lesson.id + " " + hub + " 307");
        }
        for (const id of new Set([lesson.classroomId, ...Object.values(lesson.classroomIds || {})])) {
          if (!id) continue;
          const match = getPublicLessonByClassroomId(id);
          const localized = match && getClassroomIdForLocale(match.lesson, locale);
          const source = "/" + locale + "/classroom-player/" + id;
          const target = localized ? "/" + locale + "/classroom-player/" + localized : hub;
          if (source !== target) redirects.push(source + " " + target + " 307");
        }
      }
    }
  }
  return Response.json({ redirects: [...new Set(redirects)] });
}
`,
);

const build = spawnSync(
  process.execPath,
  [join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
  {
    cwd: stage,
    env,
    stdio: "inherit",
  },
);
if (build.status !== 0) process.exit(build.status ?? 1);
const stagedOutput = join(stage, "out");
const { redirects } = JSON.parse(
  await readFile(join(stagedOutput, "pages-build-manifest"), "utf8"),
);
await rm(join(stagedOutput, "pages-build-manifest"));
// Mirror default-locale entry points without requiring a runtime locale proxy.
async function visit(path = "") {
  for (const entry of await readdir(join(stagedOutput, path), { withFileTypes: true })) {
    const file = path ? path + "/" + entry.name : entry.name;
    if (entry.isDirectory()) await visit(file);
    else if (file.startsWith("en/") && file.endsWith(".html")) {
      const route = "/" + file.slice(0, -5);
      redirects.push(route.slice(3) + " " + route + " 307");
    }
  }
}
await visit();
const uniqueRedirects = [...new Set(redirects)];
// Pages redirects are exact for known withdrawn content. Unknown URLs return 404.
await writeFile(join(stagedOutput, "_redirects"), uniqueRedirects.join("\n") + "\n");
process.env.NEXT_PUBLIC_DEPLOYMENT_PREVIEW = "1";
const { default: config } = await import("../next.config.js");
const headers = (await config.headers())[0].headers;
await writeFile(
  join(stagedOutput, "_headers"),
  "/*\n" +
    headers.map(({ key, value }) => "  " + key + ": " + value).join("\n") +
    "\n/en/opengraph-image\n  Content-Type: image/png\n/zh/opengraph-image\n  Content-Type: image/png\n/api/news-status\n  Content-Type: application/json; charset=utf-8\n",
);
await rm(output, { recursive: true, force: true });
await cp(stagedOutput, output, { recursive: true });
console.log(
  "Pages static output: out/; " + uniqueRedirects.length + " redirects; no server functions.",
);
