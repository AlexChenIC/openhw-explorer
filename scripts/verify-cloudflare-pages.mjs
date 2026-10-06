import { readFile, mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { assertNewsSnapshot, courseAudioUrl } from "./lib/pages-export.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const base = process.env.PAGES_VERIFY_URL || "https://openhw-explorer-test.pages.dev";
const commit =
  process.env.DEPLOYMENT_GIT_SHA ||
  execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
const digest = JSON.parse(await readFile(join(root, "src/data/news-digest.json"), "utf8"));
const report = { checkedAt: new Date().toISOString(), base, commit, checks: [] };
async function request(path, options = {}) {
  const url = new URL(path, base);
  url.searchParams.set("verify", commit);
  let last;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(20000),
        cache: "no-store",
      });
      if (response.status >= 500) throw new Error(`HTTP ${response.status}: ${path}`);
      return response;
    } catch (error) {
      last = error;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
  throw last;
}
try {
  let live;
  for (let attempt = 0; attempt < 12; attempt++) {
    const response = await request("/api/news-status");
    if (!response.ok) throw new Error(`Status endpoint returned ${response.status}`);
    live = await response.json();
    try {
      assertNewsSnapshot(live, digest, commit);
      break;
    } catch (error) {
      if (attempt === 11) throw error;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  report.news = live;
  const sitemap = new XMLParser().parse(await readFile(join(root, "out/sitemap.xml"), "utf8"));
  const entries = sitemap.urlset?.url;
  if (!Array.isArray(entries) || !entries.length)
    throw new Error("Missing exported sitemap routes");
  const routes = new Set(entries.map((entry) => new URL(entry.loc).pathname));
  for (const locale of ["en", "zh"]) {
    routes.add(`/${locale}/classroom/project-guides/cva6-introduction`);
  }
  for (const route of routes) {
    const response = await request(route);
    const html = await response.text();
    if (response.status !== 200 || !html.includes("<h1")) {
      throw new Error(`Missing page content: ${route}`);
    }
    if (!response.headers.get("x-robots-tag")?.includes("noindex")) {
      throw new Error(`Missing mirror noindex header: ${route}`);
    }
    report.checks.push({ path: route, status: response.status });
  }
  for (const locale of ["en", "zh"]) {
    const packageName = `openhw-essentials-core-v-names-${locale}.json`;
    const course = JSON.parse(
      await readFile(join(root, "src/data/published-classrooms", packageName), "utf8"),
    );
    function audio(value) {
      if (!value || typeof value !== "object") return null;
      if (typeof value.audioUrl === "string" && value.audioUrl.startsWith("/"))
        return value.audioUrl;
      for (const child of Object.values(value)) {
        const found = audio(child);
        if (found) return found;
      }
      return null;
    }
    const url = courseAudioUrl(course.id, audio(course));
    if (!url) throw new Error(`No public course audio for ${locale}`);
    const response = await request(url);
    const bytes = Buffer.from(await response.arrayBuffer());
    const local = await readFile(join(root, "public", url));
    const sha = (value) => createHash("sha256").update(value).digest("hex");
    if (!response.ok || sha(bytes) !== sha(local)) throw new Error(`Course audio differs: ${url}`);
    report.checks.push({ path: url, status: response.status, sha256: sha(bytes) });
  }
  for (const [path, target] of [
    ["/", "/en"],
    ["/zh/classroom/cva6-from-zero", "/zh/classroom"],
    ["/zh/classroom-player/cva6-project-intro-en", "/zh/classroom-player/cva6-project-intro-zh"],
  ]) {
    const response = await request(path, { redirect: "manual" });
    const location = new URL(response.headers.get("location") || "", base).pathname;
    if (response.status !== 307 || location !== target) throw new Error(`Wrong redirect: ${path}`);
    report.checks.push({ path, status: response.status, target: location });
  }
  const missing = await request("/not-a-real-openhw-route", { redirect: "manual" });
  if (missing.status !== 404) throw new Error("Unknown route must return 404");
  report.checks.push({ path: "/not-a-real-openhw-route", status: 404 });
  report.passed = true;
  console.log(
    `Pages verified: commit ${commit}, ${live.itemCount} news items, ${report.checks.length} page/media/redirect checks.`,
  );
} catch (error) {
  report.passed = false;
  report.error = error.message;
  process.exitCode = 1;
  console.error(error.message);
} finally {
  await mkdir(join(root, "reports"), { recursive: true });
  await writeFile(
    join(root, "reports/pages-deployment-verification.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
}
