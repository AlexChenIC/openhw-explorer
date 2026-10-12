import { describe, expect, it } from "vitest";
import { editorialReviewHealth } from "../scripts/lib/news-editorial-health.mjs";

const digestDate = "2026-10-01T01:00:00.000Z";
const now = new Date("2026-10-11T17:00:00.000Z"); // October 12 in Shanghai.
const review = { checkedOn: "2026-10-12", outcome: "no_new_items", candidateCount: 43, addedCount: 0, digestUpdatedAt: digestDate };
const liveFor = (record) => ({ lastCheckedOn: record.checkedOn, lastCheckOutcome: record.outcome, lastCheckAddedCount: record.addedCount });

describe("completed daily editorial review health", () => {
  it("allows old content when a fresh review honestly selected zero items", () => {
    expect(editorialReviewHealth(digestDate, review, liveFor(review), now)).toMatchObject({ ageDays: 0, errors: [], warnings: [] });
  });
  it("detects an interrupted daily editor even when source collection and the digest deployment match", () => {
    const stalled = { ...review, checkedOn: "2026-10-09" };
    expect(editorialReviewHealth(digestDate, stalled, liveFor(stalled), now)).toMatchObject({ ageDays: 3, errors: [expect.stringContaining("has stalled")] });
  });
  it("warns at two calendar days and tolerates a single delayed run", () => {
    for (const [date, warnings] of [["2026-10-10", 1], ["2026-10-11", 0]]) {
      const record = { ...review, checkedOn: date };
      const health = editorialReviewHealth(digestDate, record, liveFor(record), now);
      expect(health.errors).toEqual([]);
      expect(health.warnings).toHaveLength(warnings);
    }
  });
  it("rejects future, invalid and superseded review claims", () => {
    for (const change of [{ checkedOn: "2026-10-13" }, { checkedOn: "2026-02-30" }, { digestUpdatedAt: "2026-10-02T00:00:00.000Z" }]) {
      const record = { ...review, ...change };
      expect(editorialReviewHealth(digestDate, record, liveFor(record), now).errors).toHaveLength(1);
    }
  });
  it.each(["lastCheckedOn", "lastCheckOutcome", "lastCheckAddedCount"])("detects a stale production %s", (field) => {
    expect(editorialReviewHealth(digestDate, review, { ...liveFor(review), [field]: null }, now).errors).toEqual([expect.stringContaining("does not match")]);
  });
});
