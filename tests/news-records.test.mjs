import { describe, expect, it } from "vitest";
import { mergeEventCoverage, normalizeCuratedDates } from "../scripts/lib/news-records.mjs";
import { collectionDecision } from "../scripts/lib/news-collection-health.mjs";

describe("news publication invariants", () => {
  it("never promotes discovery date to publication date", () => {
    expect(normalizeCuratedDates({ addedAt: "2026-06-09" })).toEqual({ publishedAt: "", addedAt: "2026-06-09" });
    expect(() => normalizeCuratedDates({ publishedAt: "bad" })).toThrow();
  });
  it("merges only explicitly associated events and preserves the original report", () => {
    const items = [{ url: "repost", eventId: "one" }, { url: "original", eventId: "one", eventRole: "primary" }, { url: "other-release" }];
    const result = mergeEventCoverage(items);
    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("original");
    expect(result[0].relatedSources[0].url).toBe("repost");
  });
  it("distinguishes failure, degraded empty results and successful empty results", () => {
    expect(collectionDecision([{ status: "failed" }], 0)).toMatchObject({ status: "failed", publishCandidates: false });
    expect(collectionDecision([{ status: "ok" }, { status: "failed" }], 0)).toMatchObject({ status: "degraded", publishCandidates: false });
    expect(collectionDecision([{ status: "ok" }], 0)).toMatchObject({ status: "ok", publishCandidates: true });
  });
});
