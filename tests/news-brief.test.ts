import { describe, expect, it } from "vitest";
import { type BriefArticle, isOlderNews, isOpenhwNews, selectNewsBrief } from "@/lib/news-brief";
import { resolveEditorPick } from "@/lib/news-editor-pick.mjs";
import digest from "@/data/news-digest.json";
import pick from "@/data/news-editor-pick.json";

const article: BriefArticle = {
  url: "https://example.org/news", title: "New RISC-V ecosystem report", source: "Example",
  tags: ["RISC-V"], publishedAt: "2026-11-06", reviewStatus: "curated", sourceTier: "trusted",
};
const openhw: BriefArticle = {
  ...article, url: "https://github.com/openhwfoundation/cv-hpdcache/releases/tag/v6.1.0",
  title: "HPDcache release", source: "OpenHW / HPDcache", tags: ["OpenHW", "HPDcache"], publishedAt: "2026-10-16",
};
const tool: BriefArticle = {
  ...article, url: "https://example.org/verilator", title: "Verilator changes", tags: ["Verilator"], publishedAt: "2026-11-02",
};
const day = "2026-11-09";

describe("three distinct news lanes", () => {
  it("reserves the newest OpenHW update and sorts by original dates rather than curated order", () => {
    const older = { ...openhw, url: "https://example.org/old-openhw", publishedAt: "2026-09-01" };
    const result = selectNewsBrief([older, tool, openhw, article], null, day);
    expect(result).toEqual({ lead: article, openhw, toolchain: tool, latest: article });
  });
  it("keeps three slots when the editorial recommendation is also the latest story", () => {
    const result = selectNewsBrief([article, openhw, tool], { item: article }, day);
    expect(result.lead).toBe(article);
    expect(new Set([result.lead?.url, result.openhw?.url, result.toolchain?.url]).size).toBe(3);
  });
  it("replaces the lead with a different recommended story instead of adding a fourth card", () => {
    const selected = { ...article, url: "https://example.org/selected", publishedAt: "2026-11-04" };
    const result = selectNewsBrief([article, openhw, tool, selected], { item: selected }, day);
    expect(result.lead).toBe(selected);
    expect(result.latest).toBe(article);
    expect(result.openhw).toBe(openhw);
    expect(result.toolchain).toBe(tool);
  });
  it("keeps an OpenHW recommendation in its own lane without repeating or downgrading that lane", () => {
    const result = selectNewsBrief([article, openhw, tool], { item: openhw }, day);
    expect(result.lead).toBe(article);
    expect(result.openhw).toBe(openhw);
    expect(result.toolchain).toBe(tool);
  });
  it("does not repeat a toolchain recommendation in the toolchain lane", () => {
    const nextTool = { ...tool, url: "https://example.org/yosys", tags: ["Yosys"], publishedAt: "2026-11-01" };
    const result = selectNewsBrief([tool, article, openhw, nextTool], { item: tool }, day);
    expect(result.lead).toBe(tool);
    expect(result.toolchain).toBe(nextTool);
  });
  it("leaves missing lane contents empty rather than mislabelling unrelated news", () => {
    const result = selectNewsBrief([article], null, day);
    expect(result.lead).toBe(article);
    expect(result.openhw).toBeUndefined();
    expect(result.toolchain).toBeUndefined();
  });
  it("does not relabel the next article as the global latest when the latest belongs to OpenHW", () => {
    const newestOpenhw = { ...openhw, publishedAt: "2026-11-09" };
    const result = selectNewsBrief([article, newestOpenhw, tool], null, day);
    expect(result.lead).toBe(article);
    expect(result.latest).toBe(newestOpenhw);
  });
  it.each([
    { publishedAt: "" }, { publishedAt: "2026-02-30" }, { publishedAt: "2026-11-10" },
    { reviewStatus: "auto" }, { sourceTier: "community" }, { url: "javascript:alert(1)" },
  ])("rejects undated, future and unverified items from all lanes: %j", (change) => {
    const invalid = { ...openhw, ...change };
    expect(selectNewsBrief([invalid], { item: invalid }, day).openhw).toBeUndefined();
    expect(selectNewsBrief([invalid], { item: invalid }, day).lead).toBeUndefined();
  });
  it("allows historical OpenHW updates without changing dates or making them editorial recommendations", () => {
    const before = JSON.stringify(openhw);
    expect(isOlderNews(openhw, "2026-11-15")).toBe(false);
    expect(isOlderNews(openhw, "2026-11-16")).toBe(true);
    expect(selectNewsBrief([openhw], null, "2026-12-01").openhw).toBe(openhw);
    expect(JSON.stringify(openhw)).toBe(before);
  });
  it("does not bring back an expired editorial recommendation", () => {
    const recommendation = resolveEditorPick(digest.items, pick, digest.generatedAt, "2026-11-16");
    expect(recommendation).toBeNull();
    const result = selectNewsBrief(digest.items, recommendation, "2026-11-16");
    expect(result.lead).toBe(result.latest);
    expect(result.openhw?.url).toContain("cv-hpdcache/releases/tag/v6.1.0");
  });
  it("ships distinct, dated OpenHW/toolchain lanes without mutating the archive", () => {
    const before = JSON.stringify(digest);
    const recommendation = resolveEditorPick(digest.items, pick, digest.generatedAt, pick.reviewedOn);
    const result = selectNewsBrief(digest.items, recommendation, pick.reviewedOn);
    expect(result.openhw?.url).toContain("cv-hpdcache/releases/tag/v6.1.0");
    expect(result.openhw?.publishedAt).toBe("2026-10-16");
    expect(new Set([result.lead?.url, result.openhw?.url, result.toolchain?.url]).size).toBe(3);
    expect(JSON.stringify(digest)).toBe(before);
  });
});

describe("explicit OpenHW affiliation", () => {
  it("accepts official domains, current/legacy GitHub orgs and reviewed OpenHW TV recordings", () => {
    for (const url of ["https://openhwfoundation.org/news/item", "https://www.openhwgroup.org/news/item",
      "https://github.com/openhwfoundation/cva6/releases/tag/v1", "https://github.com/openhwgroup/cva6/releases/tag/v1"]) {
      expect(isOpenhwNews({ ...article, url })).toBe(true);
    }
    expect(isOpenhwNews({ ...article, url: "https://www.youtube.com/watch?v=abc", source: "OpenHW TV" })).toBe(true);
  });
  it("accepts explicitly tagged OpenHW news or a project-focused third-party report", () => {
    expect(isOpenhwNews({ ...article, tags: ["OpenHW"] })).toBe(true);
    expect(isOpenhwNews({ ...article, title: "CVA6 verification improvements", tags: ["CVA6", "Verification"] })).toBe(true);
  });
  it("rejects generic RISC-V news, incidental CVA6 tags, similar hostnames and unknown YouTube publishers", () => {
    expect(isOpenhwNews(article)).toBe(false);
    expect(isOpenhwNews({ ...article, tags: ["RISC-V", "CVA6"] })).toBe(false);
    expect(isOpenhwNews({ ...article, url: "https://openhwfoundation.org.example.org/news" })).toBe(false);
    expect(isOpenhwNews({ ...article, url: "https://github.com/openhwfoundation-other/project" })).toBe(false);
    expect(isOpenhwNews({ ...article, url: "https://youtube.com/watch?v=abc" })).toBe(false);
    expect(isOpenhwNews({ ...openhw, reviewStatus: "auto" })).toBe(false);
  });
});
