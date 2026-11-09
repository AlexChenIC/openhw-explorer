import { afterEach, describe, expect, it } from "vitest";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  editorPickErrors, editorPickSnapshot, isEditorPickEligible, resolveEditorPick,
} from "../src/lib/news-editor-pick.mjs";
import { shanghaiDate } from "../src/lib/news-review-status.mjs";

const digestDate = "2026-11-08T14:39:33.983Z";
const article = {
  url: "https://example.org/verification", publishedAt: "2026-11-06",
  reviewStatus: "curated", sourceTier: "trusted",
};
const reason = { en: "Useful source-grounded verification details.", zh: "提供有工程参考价值的验证实现细节。" };
const record = {
  version: 1, reviewedOn: "2026-11-09", digestUpdatedAt: digestDate,
  pick: { url: article.url, selectedOn: "2026-11-09", expiresOn: "2026-11-16", reason },
};
const resolve = (value = record, day = "2026-11-09", items = [article]) =>
  resolveEditorPick(items, value, digestDate, day);
const withPick = (change) => ({ ...record, pick: { ...record.pick, ...change } });

describe("explicit, expiring editor recommendation", () => {
  it("selects only the reviewed record, never the archive's old rank-one item", () => {
    const stale = { ...article, url: "https://example.org/old", publishedAt: "2026-09-13", highlightRank: 1, editorPick: true };
    expect(resolve(record, "2026-11-09", [stale, article])?.item).toEqual(article);
    expect(resolve(record, "2026-11-09", [stale])).toBeNull();
  });
  it("has an exclusive expiry independent of whether a new build runs", () => {
    expect(resolve(record, "2026-11-15")).not.toBeNull();
    expect(resolve(record, "2026-11-16")).toBeNull();
    expect(resolve(record, "2027-01-01")).toBeNull();
    expect(editorPickErrors(record, [article], digestDate)).toEqual([]);
  });
  it("accepts 30-day-old verified articles but not 31-day-old or future articles", () => {
    expect(isEditorPickEligible({ ...article, publishedAt: "2026-10-10" }, "2026-11-09")).toBe(true);
    expect(isEditorPickEligible({ ...article, publishedAt: "2026-10-09" }, "2026-11-09")).toBe(false);
    expect(isEditorPickEligible({ ...article, publishedAt: "2026-11-10" }, "2026-11-09")).toBe(false);
    const aging = { ...article, publishedAt: "2026-10-10" };
    expect(resolve(record, "2026-11-09", [aging])).not.toBeNull();
    expect(resolve(record, "2026-11-10", [aging])).toBeNull();
  });
  it.each([
    { publishedAt: "" }, { publishedAt: null }, { publishedAt: "2026-02-30" },
    { reviewStatus: "auto" }, { reviewStatus: undefined }, { sourceTier: "community" },
    { url: "http://example.org/article" }, { url: "javascript:alert(1)" },
  ])("rejects an ineligible article: %j", (change) => {
    expect(isEditorPickEligible({ ...article, ...change }, "2026-11-09")).toBe(false);
  });
  it("allows reviewed official sources as well as curated trusted sources", () => {
    expect(isEditorPickEligible({ ...article, reviewStatus: "reviewed", sourceTier: "official" }, "2026-11-09")).toBe(true);
  });
  it.each([
    { expiresOn: "2026-11-24" }, { expiresOn: "2026-11-09" },
    { selectedOn: "2026-11-10" }, { expiresOn: "2026-02-30" },
    { reason: { en: "", zh: reason.zh } }, { url: "https://example.org/missing" },
  ])("rejects invalid selection metadata: %j", (change) => {
    expect(resolve(withPick(change))).toBeNull();
  });
  it("allows a maximum 14-day window and preserves dates on a subsequent review", () => {
    expect(resolve(withPick({ expiresOn: "2026-11-23" }))).not.toBeNull();
    const retained = { ...record, reviewedOn: "2026-11-10" };
    expect(resolve(retained, "2026-11-10")?.expiresOn).toBe("2026-11-16");
    expect(resolve(retained, "2026-11-09")).toBeNull();
  });
  it("rejects invalid, future or superseded reviews instead of filling the slot", () => {
    for (const value of [null, {}, { ...record, reviewedOn: "2026-11-07" },
      { ...record, reviewedOn: "2026-11-10" }, { ...record, digestUpdatedAt: "old" }]) {
      expect(resolve(value)).toBeNull();
    }
    expect(resolve(record, "")).toBeNull();
  });
  it("supports an explicit bilingual no-pick decision without a fallback", () => {
    const empty = { ...record, pick: null, noPickReason: reason };
    expect(editorPickErrors(empty, [article], digestDate)).toEqual([]);
    expect(resolve(empty)).toBeNull();
    expect(editorPickErrors({ ...empty, noPickReason: undefined }, [article], digestDate)).not.toEqual([]);
    expect(editorPickSnapshot(empty, [article], digestDate)).toEqual({
      editorPickReviewedOn: record.reviewedOn, editorPickUrl: null, editorPickExpiresOn: null,
    });
  });
  it("exposes stored metadata without claiming that an old selection is still active", () => {
    expect(editorPickSnapshot(record, [article], digestDate)).toEqual({
      editorPickReviewedOn: record.reviewedOn, editorPickUrl: article.url, editorPickExpiresOn: record.pick.expiresOn,
    });
    expect(editorPickSnapshot({}, [article], digestDate).editorPickUrl).toBeNull();
  });
  it("uses Shanghai calendar boundaries around expiry", () => {
    expect(resolve(record, shanghaiDate(new Date("2026-11-15T15:59:59Z")))).not.toBeNull();
    expect(resolve(record, shanghaiDate(new Date("2026-11-15T16:00:00Z")))).toBeNull();
  });
  it("validates the shipped record against the exact archive snapshot", () => {
    const digest = JSON.parse(readFileSync(new URL("../src/data/news-digest.json", import.meta.url)));
    const shipped = JSON.parse(readFileSync(new URL("../src/data/news-editor-pick.json", import.meta.url)));
    expect(editorPickErrors(shipped, digest.items, digest.generatedAt)).toEqual([]);
  });
});

const temporaryDirectories = [];
afterEach(() => { for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true }); });

describe("daily review publication guard", () => {
  it("requires a recommendation review even on a day with no added news", () => {
    const root = mkdtempSync(join(tmpdir(), "openhw-pick-test-"));
    temporaryDirectories.push(root);
    for (const directory of ["scripts", "src/lib", "src/data"]) mkdirSync(join(root, directory), { recursive: true });
    for (const path of ["scripts/record-news-review.mjs", "src/lib/news-review-status.mjs", "src/lib/news-editor-pick.mjs"]) {
      cpSync(new URL(`../${path}`, import.meta.url), join(root, path));
    }
    const write = (name, value) => writeFileSync(join(root, "src/data", name), JSON.stringify(value));
    write("news-digest.json", { generatedAt: digestDate, items: [article] });
    write("news-editor-pick.json", { ...record, reviewedOn: "2026-11-10" });
    write("news-review-status.json", { unchanged: true });
    const args = [join(root, "scripts/record-news-review.mjs"), "--checked-on", "2026-11-09", "--outcome", "no_new_items", "--candidate-count", "3", "--added-count", "0"];
    const blocked = spawnSync(process.execPath, args, { encoding: "utf8" });
    expect(blocked.status).not.toBe(0);
    expect(blocked.stderr).toContain("Complete the editor-pick review");
    expect(JSON.parse(readFileSync(join(root, "src/data/news-review-status.json")))).toEqual({ unchanged: true });
    write("news-editor-pick.json", record);
    const completed = spawnSync(process.execPath, args, { encoding: "utf8" });
    expect(completed.status).toBe(0);
    expect(JSON.parse(readFileSync(join(root, "src/data/news-review-status.json")))).toMatchObject({ checkedOn: "2026-11-09", addedCount: 0, digestUpdatedAt: digestDate });
  });
});
