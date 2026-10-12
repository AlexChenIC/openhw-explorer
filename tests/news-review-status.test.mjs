import { describe, expect, it } from "vitest";
import { resolveNewsReviewStatus, shanghaiDate } from "../src/lib/news-review-status.mjs";

const digestDate = "2026-10-04T06:25:42.346Z";
const noNewItems = {
  checkedOn: "2026-10-06", outcome: "no_new_items", candidateCount: 52, addedCount: 0,
  digestUpdatedAt: digestDate,
};

describe("editorial review status", () => {
  it("records a later review without changing the content snapshot date", () => {
    expect(resolveNewsReviewStatus(noNewItems, digestDate)).toEqual(noNewItems);
  });
  it("never carries a no-new-items assertion onto a later digest", () => {
    expect(resolveNewsReviewStatus(noNewItems, "2026-10-07T01:00:00.000Z")).toBeNull();
  });
  it.each([
    { checkedOn: "2026-02-30" }, { checkedOn: "2026-10-03" },
    { addedCount: 1 }, { candidateCount: -1 }, { candidateCount: 1.5 },
    { outcome: "published" }, { outcome: "failed" },
    { outcome: "published", candidateCount: 1, addedCount: 2 },
  ])("rejects an impossible or inconsistent review record: %j", (change) => {
    expect(resolveNewsReviewStatus({ ...noNewItems, ...change }, digestDate)).toBeNull();
  });
  it("accepts a completed review that added items", () => {
    expect(resolveNewsReviewStatus({ ...noNewItems, outcome: "published", addedCount: 2 }, digestDate)?.addedCount).toBe(2);
  });
  it("uses the editor's timezone when a digest is published near UTC midnight", () => {
    const lateDigest = "2026-10-06T20:00:00.000Z";
    expect(shanghaiDate(new Date(lateDigest))).toBe("2026-10-07");
    expect(resolveNewsReviewStatus({ ...noNewItems, digestUpdatedAt: lateDigest }, lateDigest)).toBeNull();
  });
});
