/**
 * @typedef {Object} NewsReviewStatus
 * @property {string} checkedOn Editorial review date in Asia/Shanghai (YYYY-MM-DD).
 * @property {"no_new_items" | "published"} outcome
 * @property {number} candidateCount
 * @property {number} addedCount
 * @property {string} digestUpdatedAt Content snapshot this review applies to.
 */

/** @param {unknown} value */
export function isCalendarDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** @param {Date} date */
export function shanghaiDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

/**
 * Ignore invalid or superseded records rather than reporting a review of new content.
 * @param {unknown} value
 * @param {string} digestUpdatedAt
 * @returns {NewsReviewStatus | null}
 */
export function resolveNewsReviewStatus(value, digestUpdatedAt) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = /** @type {Record<string, unknown>} */ (value);
  const { checkedOn, outcome, candidateCount, addedCount } = record;
  const digestDate = new Date(digestUpdatedAt);
  if (!isCalendarDate(checkedOn) || !Number.isFinite(digestDate.getTime()) ||
      record.digestUpdatedAt !== digestUpdatedAt ||
      (outcome !== "no_new_items" && outcome !== "published") ||
      typeof candidateCount !== "number" || !Number.isSafeInteger(candidateCount) || candidateCount < 0 ||
      typeof addedCount !== "number" || !Number.isSafeInteger(addedCount) || addedCount < 0 || addedCount > candidateCount ||
      (outcome === "no_new_items" ? addedCount !== 0 : addedCount === 0) ||
      /** @type {string} */ (checkedOn) < shanghaiDate(digestDate)) return null;
  return {
    checkedOn: /** @type {string} */ (checkedOn), outcome, candidateCount, addedCount, digestUpdatedAt,
  };
}
