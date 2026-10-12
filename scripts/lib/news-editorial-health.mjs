import { resolveNewsReviewStatus, shanghaiDate } from "../../src/lib/news-review-status.mjs";

// Source publication dates may stay old after a valid zero-selection review.
// Watch the completed review independently so an interrupted editor cannot look healthy.
export function editorialReviewHealth(digestUpdatedAt, review, production, now = new Date()) {
  const errors = [];
  const warnings = [];
  const record = resolveNewsReviewStatus(review, digestUpdatedAt);
  if (!record) {
    errors.push("No valid completed editorial review is recorded for the current digest.");
    return { errors, warnings };
  }
  const ageDays = (Date.parse(shanghaiDate(now)) - Date.parse(record.checkedOn)) / 86400000;
  if (ageDays < 0) errors.push("Completed editorial review date is in the future.");
  else if (ageDays > 2) errors.push(`Editorial review is ${ageDays} calendar days old (Asia/Shanghai). The daily curation task has stalled; source collection success does not mean publication succeeded.`);
  else if (ageDays === 2) warnings.push("No completed editorial review has been published for two calendar days. Check the daily curation task.");
  if (production.lastCheckedOn !== record.checkedOn ||
      production.lastCheckOutcome !== record.outcome ||
      production.lastCheckAddedCount !== record.addedCount) {
    errors.push("Production editorial review does not match this main-branch checkout. Check the news status deployment.");
  }
  return { checkedOn: record.checkedOn, ageDays, errors, warnings };
}
