import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i < 0 ? undefined : process.argv[i + 1];
};
const base = arg("--base");
if (!base) throw new Error("Pass --base <URL>");
const expectedCommit = arg("--expected-commit");
const primaryRedirect = new URL(base).hostname === "openhw-explorer.pages.dev";
const manifest = JSON.parse(
  await fs.readFile(
    path.join(root, "docs/course-guides/cva6/20261018/release-manifest.json"),
    "utf8",
  ),
);
const results = [];
async function request(p) {
  const url = new URL(p, base);
  if (expectedCommit) url.searchParams.set("verify", expectedCommit);
  if (primaryRedirect) {
    const r = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
    const expected = new URL(url.pathname + url.search, "https://openhwexplorer.com");
    if (r.status !== 301 || r.headers.get("location") !== expected.href)
      throw new Error(`Incorrect primary Pages redirect: ${p}`);
    results.push({ path: p, firstHop: 301, target: expected.href });
  }
  const r = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${p}`);
  return r;
}
if (expectedCommit) {
  const d = await (await request("/api/news-status")).json();
  const actual = d.gitSha ?? d.commit ?? d.commitSha ?? d.deployment?.commit;
  if (actual !== expectedCommit) throw new Error(`Wrong deployment commit ${actual}`);
  results.push({ snapshotCommit: actual });
}
for (const locale of ["en", "zh"]) {
  const id = `cva6-project-intro-${locale}`;
  const course = JSON.parse(
    await fs.readFile(path.join(root, `src/data/published-classrooms/${id}.json`), "utf8"),
  );
  for (const p of [
    `/${locale}/classroom-player/${id}`,
    `/${locale}/classroom/project-guides/cva6-introduction`,
  ]) {
    const r = await request(p);
    const html = await r.text();
    for (const text of [
      course.stage.name,
      course.scenes[0].actions[0].audioUrl,
      "20261018",
      "Alex Chen",
    ]) {
      if (!html.includes(text)) throw new Error(`Missing course content ${text}: ${p}`);
    }
    results.push({ path: p, status: r.status, hasCurrentCourse: true });
  }
}
let index = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (index < manifest.assets.length) {
      const asset = manifest.assets[index++];
      const r = await request(asset.path);
      const bytes = new Uint8Array(await r.arrayBuffer());
      if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256)
        throw new Error(`Digest mismatch: ${asset.path}`);
      const type = asset.path.endsWith(".mp3")
        ? "audio/mpeg"
        : asset.path.endsWith(".vtt")
          ? "text/vtt"
          : "image/png";
      if (!r.headers.get("content-type")?.startsWith(type))
        throw new Error(`Wrong MIME: ${asset.path}`);
      results.push({
        path: asset.path,
        status: r.status,
        bytes: bytes.length,
        sha256: asset.sha256,
        type,
      });
    }
  }),
);
const report = {
  checkedAt: new Date().toISOString(),
  base,
  expectedCommit,
  checks: results.length,
  results,
};
const dest =
  arg("--report") ??
  path.join(root, "reports", `cva6-overview-${new URL(base).host.replaceAll(":", "-")}.json`);
await fs.mkdir(path.dirname(dest), { recursive: true });
await fs.writeFile(dest, JSON.stringify(report, null, 2) + "\n");
console.log(`${base}: ${results.length} checks passed; all 76 media digests match.`);
