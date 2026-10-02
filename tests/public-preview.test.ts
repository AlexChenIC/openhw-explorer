import { afterEach, describe, expect, it, vi } from "vitest";

// Exercise the publication guard before the external locale-routing adapter.
vi.mock("next-intl/middleware", () => ({
  default: () => () => {
    throw new Error("Withdrawn routes must redirect before locale middleware");
  },
}));
vi.mock("@/lib/routing", () => ({ routing: { locales: ["en", "zh"], defaultLocale: "en" } }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function loadPublication(preview = "true", courses = "true", industry = "false") {
  vi.stubEnv("NEXT_PUBLIC_ENABLE_PUBLIC_PREVIEW", preview);
  vi.stubEnv("NEXT_PUBLIC_ENABLE_CLASSROOM_COURSES", courses);
  vi.stubEnv("NEXT_PUBLIC_ENABLE_INDUSTRY_LANDSCAPE", industry);
  vi.resetModules();
  return import("@/data/classroom-publication");
}

describe("Summit Public Preview publication boundary", () => {
  it("offers Foundation, names and CVA6 in order, retaining Demo approval status", async () => {
    const publication = await loadPublication();
    const series = publication.getPublicClassroomSeries();
    expect(series.flatMap((item) => item.lessons.map((lesson) => lesson.title.en))).toEqual([
      "What is the OpenHW Foundation?",
      "How to read CORE-V core names",
      "CVA6: From Core to System",
    ]);
    expect(series[0].units).toHaveLength(2);
    expect(series[1].lessons[0].status).toBe("demo");
    expect(publication.getPublicClassroomIds()).toHaveLength(6);
    expect(publication.getPublicSeriesById("cva6-from-zero")).toBeUndefined();
    expect(
      publication.getPublicLessonById("openhw-foundations", "openhw-u03-l01-riscv-corev-core-soc"),
    ).toBeUndefined();
    expect(
      publication.getPublicLessonByClassroomId("openhw-overview-industrial-adoption-en"),
    ).toBeUndefined();
    for (const id of publication.getPublicClassroomIds()) {
      expect(publication.getPublicLessonByClassroomId(id)).toBeDefined();
    }
  });

  it("keeps the original planned catalog recoverable without changing its metadata", async () => {
    const publication = await loadPublication();
    const { getSeriesById } = await import("@/data/classrooms");
    const source = getSeriesById("openhw-foundations")!;
    expect(source.lessons[0].id).toBe("openhw-u01-l01-core-v-names");
    expect(source.lessons.some((lesson) => lesson.status === "planned")).toBe(true);
    publication.getPublicClassroomSeries();
    expect(source.lessons[0].id).toBe("openhw-u01-l01-core-v-names");
    const restored = await loadPublication("false");
    expect(restored.getPublicSeriesById("cva6-from-zero")).toBeDefined();
    expect(restored.getPublicSeriesById("openhw-foundations")!.lessons.length).toBeGreaterThan(2);
  });

  it("withdraws course detail links and players when the existing emergency flag is off", async () => {
    const publication = await loadPublication("true", "false");
    expect(publication.getPublicClassroomSeries()).toEqual([]);
    expect(publication.getPublicClassroomIds()).toEqual([]);
    expect(publication.getPublicLessonByClassroomId("cva6-project-intro-en")).toBeUndefined();
    const { default: sitemap } = await import("@/app/sitemap");
    expect(sitemap().some((entry) => entry.url.includes("/classroom/"))).toBe(false);
  });

  it("excludes withdrawn Industry routes and draft content from indexing, with explicit recovery", async () => {
    await loadPublication();
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/resources/industry"))).toBe(false);
    expect(urls.some((url) => url.includes("cva6-from-zero"))).toBe(false);
    expect(urls.some((url) => url.includes("cva6-introduction"))).toBe(false); // Demo remains noindex.
    expect(urls.filter((url) => /\/classroom\/openhw-foundations\/[^/]+$/.test(url))).toHaveLength(
      4,
    );
    await loadPublication("true", "true", "true");
    const restored = await import("@/app/sitemap");
    expect(
      restored.default().filter((entry) => entry.url.includes("/resources/industry")),
    ).toHaveLength(2);
  });

  it("redirects withdrawn URLs before page streaming starts, retaining the requested language", async () => {
    await loadPublication();
    const { NextRequest } = await import("next/server");
    const { default: proxy } = await import("@/proxy");
    for (const locale of ["en", "zh"]) {
      for (const path of [
        "/classroom/cva6-from-zero",
        "/classroom/openhw-foundations/openhw-u03-l01-riscv-corev-core-soc",
        "/classroom-player/openhw-overview-industrial-adoption-en",
      ]) {
        const response = proxy(new NextRequest(`https://example.com/${locale}${path}`));
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe(`https://example.com/${locale}/classroom`);
      }
      const industry = proxy(new NextRequest(`https://example.com/${locale}/resources/industry`));
      expect(industry.status).toBe(307);
      expect(industry.headers.get("location")).toBe(`https://example.com/${locale}/resources`);
    }
    const languageSwitch = proxy(
      new NextRequest("https://example.com/zh/classroom-player/cva6-project-intro-en"),
    );
    expect(languageSwitch.status).toBe(307);
    expect(languageSwitch.headers.get("location")).toBe(
      "https://example.com/zh/classroom-player/cva6-project-intro-zh",
    );
  });
});
