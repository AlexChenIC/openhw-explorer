import { afterEach, describe, expect, it, vi } from "vitest";
import {
  forceStaticRoute,
  assertNewsSnapshot,
  withLocaleStaticParams,
} from "../scripts/lib/pages-export.mjs";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Pages build isolation", () => {
  it("adds a static export without rewriting the existing route", () => {
    const source = 'export default function Page() { return "dynamic"; }\n';
    expect(forceStaticRoute(source, "page.ts")).toBe(
      source + '\nexport const dynamic = "force-static";\n',
    );
  });
  it("preserves already-static routes and rejects incompatible runtime routes", () => {
    const source = 'export const dynamic = "force-static";';
    expect(forceStaticRoute(source, "route.ts")).toBe(source);
    expect(() => forceStaticRoute('export const dynamic = "force-dynamic";', "route.ts")).toThrow(
      "runtime route",
    );
  });
  it("adds locale parameters for metadata without replacing an existing generator", () => {
    const source = "export default function Image() {}\n";
    expect(withLocaleStaticParams(source, "image.tsx")).toContain('["en", "zh"]');
    const existing = "export function generateStaticParams() { return []; }";
    expect(withLocaleStaticParams(existing, "image.tsx")).toBe(existing);
  });
  it("checks digest date, count, latest date and exact deployment revision", () => {
    const digest = { generatedAt: "2026-10-04T00:00:00Z", items: [{ publishedAt: "2026-10-01" }] };
    const actual = {
      editorialUpdatedAt: digest.generatedAt,
      itemCount: 1,
      latestSourceDate: "2026-10-01",
      commit: "abc",
    };
    expect(() => assertNewsSnapshot(actual, digest, "abc")).not.toThrow();
    for (const override of [
      { itemCount: 0 },
      { editorialUpdatedAt: "old" },
      { latestSourceDate: null },
      { commit: null },
    ]) {
      expect(() => assertNewsSnapshot({ ...actual, ...override }, digest, "abc")).toThrow();
    }
  });
  it("uses a platform-neutral commit while retaining Vercel compatibility", async () => {
    vi.stubEnv("DEPLOYMENT_GIT_SHA", "pages-commit");
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "vercel-commit");
    const { GET } = await import("../src/app/api/news-status/route");
    expect((await GET().json()).commit).toBe("pages-commit");
    vi.stubEnv("DEPLOYMENT_GIT_SHA", "");
    expect((await GET().json()).commit).toBe("vercel-commit");
  });
});
