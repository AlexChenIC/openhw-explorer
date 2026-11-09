import { readFileSync } from "node:fs";
import { inspectOpenhwTv } from "./lib/openhw-tv-discovery.mjs";
import { atomicJson } from "./lib/news-collection-health.mjs";

const digest = JSON.parse(readFileSync(new URL("../src/data/news-digest.json", import.meta.url), "utf8"));
const result = await inspectOpenhwTv(new Set(digest.items.map((item) => item.url)));
atomicJson(new URL("../reports/openhw-tv-discovery.json", import.meta.url), result);
for (const tab of result.tabs) {
  console.log(`OpenHW TV ${tab.tab}: ${tab.status}, ${tab.items.length} discovered, ${tab.items.filter((item) => !item.archived).length} not in archive.`);
}
console.log("Read reports/openhw-tv-discovery.json. Verify original dates and source content before selecting news; unarchived does not mean new.");
if (result.status !== "ok") process.exitCode = 1;
