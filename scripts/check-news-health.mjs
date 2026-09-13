import { readFileSync } from "node:fs";
import { atomicJson } from "./lib/news-collection-health.mjs";

const digest = JSON.parse(readFileSync(new URL("../src/data/news-digest.json", import.meta.url)));
const collection = JSON.parse(readFileSync(new URL("../reports/news-collection-health.json", import.meta.url)));
const report = { checkedAt: new Date().toISOString(), collection: collection.status, errors: [], warnings: [] };
const sources = collection.sources || [];
const success = sources.filter((source) => source.status === "ok").length;
if (!sources.length || success / sources.length < 0.5) report.errors.push("Fewer than half of configured sources were collected successfully.");
else if (success < sources.length) report.warnings.push(`${sources.length - success} sources failed; inspect the collection artifact.`);

try {
  const response = await fetch("https://openhw-explorer.vercel.app/api/news-status", { signal: AbortSignal.timeout(30000), cache: "no-store" });
  if (!response.ok) throw new Error(`Production status returned HTTP ${response.status}`);
  const live = await response.json();
  report.production = live;
  if (live.editorialUpdatedAt !== digest.generatedAt || live.itemCount !== digest.items.length) {
    report.errors.push("Production news does not match this main-branch checkout. Check Vercel deployment.");
  }
  const age = (Date.now() - Date.parse(live.editorialUpdatedAt)) / 86400000;
  if (!Number.isFinite(age)) report.errors.push("Production editorial timestamp is invalid.");
  else if (age > 7) report.warnings.push(`Last editorial change was ${Math.floor(age)} days ago. This may be a valid no-news interval; review the local curation task, not the timestamp alone.`);
} catch (error) { report.errors.push(error.message); }

atomicJson(new URL("../reports/news-health.json", import.meta.url), report);
for (const warning of report.warnings) console.warn(`::warning::${warning}`);
for (const error of report.errors) console.error(`::error::${error}`);
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFileSync } = await import("node:fs");
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, ["## Daily news health", `Sources: ${success}/${sources.length} successful.`, ...report.errors.map((message) => "- ERROR: " + message), ...report.warnings.map((message) => "- Review: " + message)].join("\n") + "\n");
}
if (report.errors.length) process.exitCode = 1;
