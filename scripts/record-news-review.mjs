#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolveNewsReviewStatus, shanghaiDate } from "../src/lib/news-review-status.mjs";

const flags = ["--checked-on", "--outcome", "--candidate-count", "--added-count"];
const args = process.argv.slice(2);
const values = new Map();
for (let i = 0; i < args.length; i += 2) {
  if (!flags.includes(args[i]) || !args[i + 1] || values.has(args[i])) {
    throw new Error("Expected unique --checked-on, --outcome, --candidate-count and --added-count flags.");
  }
  values.set(args[i], args[i + 1]);
}
if (values.size !== flags.length) throw new Error("All four review flags are required.");

const digest = JSON.parse(readFileSync(new URL("../src/data/news-digest.json", import.meta.url), "utf8"));
const record = resolveNewsReviewStatus({
  checkedOn: values.get("--checked-on"),
  outcome: values.get("--outcome"),
  candidateCount: /^\d+$/.test(values.get("--candidate-count")) ? Number(values.get("--candidate-count")) : NaN,
  addedCount: /^\d+$/.test(values.get("--added-count")) ? Number(values.get("--added-count")) : NaN,
  digestUpdatedAt: digest.generatedAt,
}, digest.generatedAt);
if (!record || record.checkedOn > shanghaiDate(new Date())) {
  throw new Error("Invalid review: use a real completed review date and consistent non-negative counts.");
}
const statusUrl = new URL("../src/data/news-review-status.json", import.meta.url);
writeFileSync(statusUrl, `${JSON.stringify(record, null, 2)}\n`);
console.log(`Recorded ${record.checkedOn}: ${record.outcome}, ${record.addedCount} selected from ${record.candidateCount} candidates. Digest dates unchanged.`);
