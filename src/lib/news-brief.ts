import { isCalendarDate } from "./news-review-status.mjs";

export interface BriefArticle {
  url: string;
  title: string;
  titleZh?: string;
  source: string;
  tags: string[];
  publishedAt: string;
  sourceTier?: string;
  reviewStatus?: string;
}

const openhwProject = /\b(?:OpenHW|CORE-V|CORE-ET|CVA6|CVW|CVE[24]|CV(?:32|64)[AE]\d+[A-Z]*|HPDcache)\b/i;
const openhwTag = /^(?:OpenHW(?: Foundation| Group| TV)?|CORE-V|CORE-ET)$/i;
const toolchainTag = /^(?:EDA|Verilator|Yosys|OpenROAD|OpenLane|LibreLane|cocotb|CIRCT|Chisel|FuseSoC|Edalize|Verible|SystemVerilog|Formal Verification|Synthesis|Simulation)$/i;

function isVerified(item: BriefArticle) {
  return ["curated", "reviewed"].includes(item.reviewStatus || "") &&
    ["official", "trusted"].includes(item.sourceTier || "");
}

export function isOpenhwNews(item: BriefArticle) {
  if (!isVerified(item)) return false;
  let url: URL;
  try { url = new URL(item.url); } catch { return false; }
  if (url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase();
  const owner = url.pathname.split("/")[1]?.toLowerCase();
  if (["openhwfoundation.org", "www.openhwfoundation.org", "openhwgroup.org", "www.openhwgroup.org"].includes(host) ||
      (host === "github.com" && ["openhwfoundation", "openhwgroup"].includes(owner))) return true;
  if (["www.youtube.com", "youtube.com", "youtu.be"].includes(host) && item.source === "OpenHW TV") return true;
  // A broad RISC-V topic or an incidental project mention does not establish affiliation.
  return item.tags.some((tag) => openhwTag.test(tag)) ||
    (openhwProject.test(`${item.title} ${item.titleZh || ""}`) &&
      item.tags.some((tag) => openhwProject.test(tag)));
}

export function isOlderNews(item: BriefArticle, asOf: string, days = 30) {
  return Date.parse(asOf) - Date.parse(item.publishedAt.slice(0, 10)) > days * 86400000;
}

export function selectNewsBrief<T extends BriefArticle>(
  items: readonly T[], recommendation: { item: T } | null, asOf: string,
) {
  const dated = items.filter((item) => {
    const day = item.publishedAt.slice(0, 10);
    return isVerified(item) && item.url.startsWith("https://") &&
      isCalendarDate(asOf) && isCalendarDate(day) && day <= asOf;
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.url.localeCompare(b.url));
  const openhw = dated.find(isOpenhwNews);
  const preferred = recommendation && dated.find((item) => item.url === recommendation.item.url);
  // Reserve the most recent OpenHW item; a recommendation can belong to either lane.
  const lead = preferred && preferred.url !== openhw?.url
    ? preferred : dated.find((item) => item.url !== openhw?.url);
  const toolchain = dated.find((item) => item.url !== lead?.url && item.url !== openhw?.url &&
    item.tags.some((tag) => toolchainTag.test(tag)));
  return { lead, openhw, toolchain, latest: dated[0] };
}
