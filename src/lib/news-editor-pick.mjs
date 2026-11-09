import { isCalendarDate, shanghaiDate } from "./news-review-status.mjs";

export const EDITOR_PICK_MAX_AGE_DAYS = 30;
export const EDITOR_PICK_MAX_DURATION_DAYS = 14;
const dayMs = 86400000;

/** @typedef {{en: string, zh: string}} PickReason */
/** @typedef {{url: string, publishedAt: string, reviewStatus?: string, sourceTier?: string}} PickArticle */
/** @typedef {{url: string, selectedOn: string, expiresOn: string, reason: PickReason}} EditorPick */
/** @typedef {{version: number, reviewedOn: string, digestUpdatedAt: string, pick: EditorPick | null, noPickReason?: PickReason}} EditorPickRecord */

/** @param {string} date */
function dateMs(date) { return Date.parse(`${date}T00:00:00Z`); }

/** @param {unknown} value */
function isObject(value) { return Boolean(value) && typeof value === "object" && !Array.isArray(value); }

/** @param {unknown} value */
function hasReason(value) {
  if (!isObject(value)) return false;
  const reason = /** @type {Record<string, unknown>} */ (value);
  return [reason.en, reason.zh].every((text) => typeof text === "string" && text.trim().length >= 10 && text.length <= 600);
}

/** @param {PickArticle} item @param {string} asOf */
export function isEditorPickEligible(item, asOf) {
  const publishedOn = typeof item.publishedAt === "string" ? item.publishedAt.slice(0, 10) : "";
  if (typeof item.url !== "string" || !/^https:\/\//.test(item.url)) return false;
  if (!isCalendarDate(asOf) || !isCalendarDate(publishedOn) ||
      !["curated", "reviewed"].includes(item.reviewStatus || "") ||
      !["official", "trusted"].includes(item.sourceTier || "")) return false;
  const age = dateMs(asOf) - dateMs(publishedOn);
  return age >= 0 && age <= EDITOR_PICK_MAX_AGE_DAYS * dayMs;
}

/**
 * Structural validation uses the recorded review day, not the build day:
 * an old but well-formed record must expire safely, not block unrelated releases.
 * @param {unknown} value
 * @param {readonly PickArticle[]} items
 * @param {string} digestUpdatedAt
 * @returns {string[]}
 */
export function editorPickErrors(value, items, digestUpdatedAt) {
  if (!isObject(value)) return ["editor pick record must be an object"];
  const record = /** @type {EditorPickRecord} */ (value);
  if (record.version !== 1 || !isCalendarDate(record.reviewedOn) ||
      !Number.isFinite(Date.parse(digestUpdatedAt)) || record.digestUpdatedAt !== digestUpdatedAt ||
      record.reviewedOn < shanghaiDate(new Date(digestUpdatedAt))) {
    return ["editor pick review must use a real date and cover the current digest"];
  }
  if (record.pick === null) {
    return hasReason(record.noPickReason) ? [] : ["a no-pick review needs a bilingual reason"];
  }
  const pick = record.pick;
  if (!isObject(pick) || typeof pick.url !== "string" || !hasReason(pick.reason) ||
      !isCalendarDate(pick.selectedOn) || !isCalendarDate(pick.expiresOn)) {
    return ["editor pick needs a canonical URL, valid selection/expiry dates and a bilingual reason"];
  }
  if (pick.selectedOn > record.reviewedOn || record.reviewedOn >= pick.expiresOn ||
      dateMs(pick.expiresOn) <= dateMs(pick.selectedOn) ||
      dateMs(pick.expiresOn) - dateMs(pick.selectedOn) > EDITOR_PICK_MAX_DURATION_DAYS * dayMs) {
    return ["editor pick must have an unexpired review and a selection window of at most 14 days"];
  }
  const item = items.find((candidate) => candidate.url === pick.url);
  if (!item || !isEditorPickEligible(item, record.reviewedOn) ||
      !isEditorPickEligible(item, pick.selectedOn)) {
    return ["editor pick must reference a reviewed, dated, official/trusted article no more than 30 days old"];
  }
  return [];
}

/**
 * No legacy ranks, keyword scores or unreviewed fallbacks can fill this slot.
 * expiresOn is exclusive, using the editorial Asia/Shanghai calendar day.
 * @template {PickArticle} T
 * @param {readonly T[]} items
 * @param {unknown} record
 * @param {string} digestUpdatedAt
 * @param {string} today
 * @returns {{item: T, reason: PickReason, reviewedOn: string, selectedOn: string, expiresOn: string} | null}
 */
export function resolveEditorPick(items, record, digestUpdatedAt, today) {
  if (!isCalendarDate(today) || editorPickErrors(record, items, digestUpdatedAt).length) return null;
  const review = /** @type {EditorPickRecord} */ (record);
  const pick = review.pick;
  if (!pick || review.reviewedOn > today || pick.selectedOn > today || today >= pick.expiresOn) return null;
  const item = items.find((candidate) => candidate.url === pick.url);
  if (!item || !isEditorPickEligible(item, today)) return null;
  return { item, reason: pick.reason, reviewedOn: review.reviewedOn, selectedOn: pick.selectedOn, expiresOn: pick.expiresOn };
}

/** @param {unknown} value @param {readonly PickArticle[]} items @param {string} digestUpdatedAt */
export function editorPickSnapshot(value, items, digestUpdatedAt) {
  if (editorPickErrors(value, items, digestUpdatedAt).length) {
    return { editorPickReviewedOn: null, editorPickUrl: null, editorPickExpiresOn: null };
  }
  const record = /** @type {EditorPickRecord} */ (value);
  return {
    editorPickReviewedOn: record.reviewedOn,
    editorPickUrl: record.pick?.url ?? null,
    editorPickExpiresOn: record.pick?.expiresOn ?? null,
  };
}
