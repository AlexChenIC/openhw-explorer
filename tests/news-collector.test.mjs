import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("collector failure and last-good protection", () => {
  for (const mode of ["timeout", "429", "invalid", "broken-xml", "empty", "atom", "partial", "duplicates"]) {
    it(mode, () => {
      const root = process.cwd();
      const dir = mkdtempSync(join(tmpdir(), "openhw-news-test-"));
      try {
        mkdirSync(join(dir, "src/data"), { recursive: true });
        cpSync(join(root, "scripts"), join(dir, "scripts"), { recursive: true });
        cpSync(join(root, "src/data/projects.ts"), join(dir, "src/data/projects.ts"));
        symlinkSync(join(root, "node_modules"), join(dir, "node_modules"), "dir");
        const file = join(dir, "src/data/news-candidates.json");
        const original = JSON.stringify({ items: [{ title: "Last good" }] });
        writeFileSync(file, original);
        const run = () => spawnSync(process.execPath, ["--import", join(root, "tests/fixtures/news-fetch.mjs"), join(dir, "scripts/fetch-news-candidates.mjs")], {
          encoding: "utf8", timeout: 20000,
          env: { ...process.env, GITHUB_TOKEN: "", GH_TOKEN: "", NEWS_FETCH_OPENHW_REPO_RELEASES: "false", NEWS_RETRY_DELAY_MS: "1", NEWS_FIXTURE: mode },
        });
        const result = run();
        const health = JSON.parse(readFileSync(join(dir, "reports/news-collection-health.json")));
        const output = readFileSync(file, "utf8");
        if (["timeout", "429", "invalid", "broken-xml"].includes(mode)) {
          expect(result.status, result.stderr).toBe(1);
          expect(health.status).toBe("failed");
          expect(output).toBe(original);
          if (mode === "429" || mode === "timeout") expect(health.sources.every((source) => source.attempts === 3)).toBe(true);
        } else {
          expect(result.status, result.stderr).toBe(0);
          expect(health.status, JSON.stringify(health)).toBe(mode === "partial" ? "degraded" : "ok");
          expect(JSON.parse(output).items).toHaveLength(["empty", "atom"].includes(mode) ? 0 : 1);
          const repeat = run();
          expect(repeat.status).toBe(0);
          expect(readFileSync(file, "utf8")).toBe(output);
        }
      } finally { rmSync(dir, { recursive: true, force: true }); }
    });
  }
});
