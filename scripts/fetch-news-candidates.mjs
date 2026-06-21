#!/usr/bin/env node

/**
 * News candidate collector for OpenHW Explorer.
 *
 * The script writes src/data/news-candidates.json only. Published content still
 * comes from src/data/curated-news.json after manual review.
 */

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PROJECTS_FILE = join(ROOT, "src/data/projects.ts");
const OUTPUT_FILE = join(ROOT, "src/data/news-candidates.json");

const DAY_MS = 24 * 60 * 60 * 1000;
const LOOKBACK_DAYS = Number(process.env.NEWS_LOOKBACK_DAYS || 45);
const OPENHW_ACTIVITY_DAYS = Number(process.env.NEWS_OPENHW_ACTIVITY_DAYS || 14);
const MAX_ITEMS = Number(process.env.NEWS_MAX_CANDIDATES || 80);
const MAX_RELEASES_PER_REPO = Number(process.env.NEWS_MAX_RELEASES_PER_REPO || 2);
const SINCE = new Date(Date.now() - LOOKBACK_DAYS * DAY_MS);
const OPENHW_ACTIVITY_SINCE = new Date(Date.now() - OPENHW_ACTIVITY_DAYS * DAY_MS);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const FETCH_OPENHW_REPO_RELEASES =
  Boolean(GITHUB_TOKEN) || process.env.NEWS_FETCH_OPENHW_REPO_RELEASES === "true";
const FETCH_TIMEOUT_MS = Number(process.env.NEWS_FETCH_TIMEOUT_MS || 30000);

const HTTP_HEADERS = {
  "User-Agent": "openhw-explorer-news-candidates",
  Accept: "application/vnd.github+json, application/rss+xml, application/xml, text/html",
};

const GITHUB_HEADERS = {
  "User-Agent": "openhw-explorer-news-candidates",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

const RSS_SOURCES = [
  {
    name: "OpenHW / Eclipse announcements",
    url: "https://newsroom.eclipse.org/rss/news/openhwgroup/announcements.xml",
    sourceTier: "official",
    defaultTags: ["OpenHW", "Eclipse Foundation"],
    defaultScore: 3,
  },
  {
    name: "RISC-V International news",
    url: "https://riscv.org/feed/",
    sourceTier: "official",
    defaultTags: ["RISC-V"],
    defaultScore: 2,
  },
  {
    name: "FOSSi Foundation",
    url: "https://fossi-foundation.org/feed.xml",
    sourceTier: "official",
    defaultTags: ["FOSSi", "Open Silicon"],
    defaultScore: 2,
  },
  {
    name: "Antmicro Blog",
    url: "https://antmicro.com/blog/feed.xml",
    sourceTier: "trusted",
    defaultTags: ["Antmicro", "Open Hardware"],
    defaultScore: 1,
  },
  {
    name: "MLCommons",
    url: "https://mlcommons.org/feed/",
    sourceTier: "trusted",
    defaultTags: ["MLCommons", "Benchmarking"],
    defaultScore: 0,
  },
  {
    name: "Apache TVM Blog",
    url: "https://tvm.apache.org/feed.xml",
    sourceTier: "trusted",
    defaultTags: ["Apache TVM", "AI Compiler"],
    defaultScore: 1,
  },
];

const HTML_SOURCES = [
  {
    name: "OpenHW Foundation News",
    url: "https://openhwfoundation.org/events/",
    parser: "openhw",
    sourceTier: "official",
    defaultTags: ["OpenHW", "Eclipse Foundation", "RISC-V"],
    defaultScore: 4,
  },
  {
    name: "Open Compute Project Blog",
    url: "https://www.opencompute.org/blog",
    parser: "ocp",
    sourceTier: "official",
    defaultTags: ["OCP", "Open Compute Project"],
    defaultScore: 0,
  },
  {
    name: "CHIPS Alliance Blog",
    url: "https://www.chipsalliance.org/categories/blog/",
    parser: "chips",
    sourceTier: "official",
    defaultTags: ["CHIPS Alliance", "Open Silicon"],
    defaultScore: 2,
  },
  {
    name: "lowRISC Newsroom",
    url: "https://lowrisc.org/news/",
    parser: "lowrisc",
    sourceTier: "official",
    defaultTags: ["lowRISC", "OpenTitan"],
    defaultScore: 2,
  },
];

const RELEASE_REPOS = [
  {
    repo: "riscv/riscv-arch-test",
    source: "RISC-V Architecture Tests (GitHub)",
    tags: ["RISC-V", "Architecture Tests", "Verification"],
    tier: "official",
  },
  {
    repo: "YosysHQ/yosys",
    source: "YosysHQ / Yosys (GitHub)",
    tags: ["Yosys", "EDA", "Synthesis"],
    tier: "trusted",
  },
  {
    repo: "verilator/verilator",
    source: "Verilator (GitHub)",
    tags: ["Verilator", "SystemVerilog", "Simulation"],
    tier: "trusted",
  },
  {
    repo: "The-OpenROAD-Project/OpenROAD",
    source: "OpenROAD (GitHub)",
    tags: ["OpenROAD", "EDA", "Physical Design"],
    tier: "trusted",
  },
  {
    repo: "The-OpenROAD-Project/OpenLane",
    source: "OpenLane (GitHub)",
    tags: ["OpenLane", "EDA", "OpenROAD"],
    tier: "trusted",
  },
  {
    repo: "cocotb/cocotb",
    source: "cocotb (GitHub)",
    tags: ["cocotb", "Verification", "Python"],
    tier: "trusted",
  },
  {
    repo: "llvm/circt",
    source: "LLVM / CIRCT (GitHub)",
    tags: ["CIRCT", "MLIR", "Hardware Compiler", "EDA"],
    tier: "trusted",
  },
  {
    repo: "chipsalliance/chisel",
    source: "CHIPS Alliance / Chisel (GitHub)",
    tags: ["Chisel", "Hardware Construction", "SoC"],
    tier: "official",
  },
  {
    repo: "chipsalliance/caliptra-rtl",
    source: "CHIPS Alliance / Caliptra RTL (GitHub)",
    tags: ["Caliptra", "Root of Trust", "Security", "RTL"],
    tier: "official",
  },
  {
    repo: "chipsalliance/caliptra-sw",
    source: "CHIPS Alliance / Caliptra SW (GitHub)",
    tags: ["Caliptra", "Root of Trust", "Security", "Firmware", "ROM"],
    tier: "official",
  },
  {
    repo: "chipsalliance/caliptra-ss",
    source: "CHIPS Alliance / Caliptra Subsystem (GitHub)",
    tags: ["Caliptra", "Root of Trust", "Security", "SoC/IP", "Subsystem"],
    tier: "official",
  },
  {
    repo: "chipsalliance/caliptra-mcu-sw",
    source: "CHIPS Alliance / Caliptra MCU SW (GitHub)",
    tags: ["Caliptra", "Root of Trust", "Security", "Firmware", "MCU", "RISC-V"],
    tier: "official",
  },
  {
    repo: "chipsalliance/i3c-core",
    source: "CHIPS Alliance / I3C Core (GitHub)",
    tags: ["CHIPS Alliance", "I3C", "Caliptra", "Hardware IP", "SoC/IP"],
    tier: "official",
  },
  {
    repo: "chipsalliance/Cores-VeeR-EL2",
    source: "CHIPS Alliance / VeeR EL2 (GitHub)",
    tags: ["VeeR", "RISC-V", "Core"],
    tier: "official",
  },
  {
    repo: "lowRISC/opentitan",
    source: "lowRISC / OpenTitan (GitHub)",
    tags: ["OpenTitan", "Root of Trust", "Security"],
    tier: "official",
  },
  {
    repo: "keystone-enclave/keystone",
    source: "Keystone Enclave (GitHub)",
    tags: ["Keystone", "Security", "TEE", "RISC-V"],
    tier: "trusted",
  },
  {
    repo: "tenstorrent/tt-metal",
    source: "Tenstorrent / TT-Metalium (GitHub)",
    tags: ["Tenstorrent", "AI", "LLM", "Accelerator", "RISC-V"],
    tier: "trusted",
  },
  {
    repo: "tenstorrent/tt-mlir",
    source: "Tenstorrent / TT-MLIR (GitHub)",
    tags: ["Tenstorrent", "AI Compiler", "MLIR", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "openxla/iree",
    source: "OpenXLA / IREE (GitHub)",
    tags: ["IREE", "OpenXLA", "AI Compiler", "MLIR", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "apache/tvm",
    source: "Apache TVM (GitHub)",
    tags: ["Apache TVM", "AI Compiler", "ML", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "pulp-platform/snitch",
    source: "PULP Platform / Snitch (GitHub)",
    tags: ["PULP", "RISC-V", "AI", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "pulp-platform/ara",
    source: "PULP Platform / Ara (GitHub)",
    tags: ["PULP", "RISC-V", "Vector", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "pulp-platform/mempool",
    source: "PULP Platform / MemPool (GitHub)",
    tags: ["PULP", "RISC-V", "Manycore", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "pulp-platform/pulp-nn",
    source: "PULP Platform / PULP-NN (GitHub)",
    tags: ["PULP", "AI", "Neural Network", "RISC-V", "Accelerator"],
    tier: "trusted",
  },
  {
    repo: "pulp-platform/pulpissimo",
    source: "PULP Platform / PULPissimo (GitHub)",
    tags: ["PULP", "RISC-V", "SoC"],
    tier: "trusted",
  },
  {
    repo: "ucb-bar/gemmini",
    source: "UC Berkeley / Gemmini (GitHub)",
    tags: ["Gemmini", "RISC-V", "AI", "Accelerator", "Chisel"],
    tier: "trusted",
  },
  {
    repo: "ucb-bar/chipyard",
    source: "Chipyard (GitHub)",
    tags: ["Chipyard", "RISC-V", "SoC", "Chisel"],
    tier: "trusted",
  },
];

const KEYWORDS = [
  {
    pattern: /\bAI\b|artificial intelligence|machine learning|\bML\b|deep learning|edge AI/i,
    score: 1,
    tag: "AI",
  },
  { pattern: /\bMLPerf\b/i, score: 3, tag: "MLPerf" },
  {
    pattern:
      /\bLLM\b|large language|inference|transformer|vLLM|\bGPT[-\s]?OSS\b|\bGPT\b|\bDeepSeek\b|open-weight|Mixture-of-Experts|\bMoE\b|speculative decoding/i,
    score: 3,
    tag: "LLM",
  },
  {
    pattern:
      /Open Data Center Ecosystem for AI|Open Cluster Designs for AI|Open Rack Wide|Foundation Chiplet System Architecture|Open Chiplet|AI Computing Continuum|Ethernet for Scale-Up|AI on Chip/i,
    score: 3,
    tag: "OCP AI Infrastructure",
  },
  {
    pattern: /accelerator|\bNPU\b|\bTPU\b|\bxPU\b|\bGPU\b|tensor|matrix|vector extension/i,
    score: 2,
    tag: "Accelerator",
  },
  {
    pattern: /\bTenstorrent\b|\bTT-Metal\b|\bTT-Metalium\b|\bTT-NN\b/i,
    score: 4,
    tag: "Tenstorrent",
  },
  {
    pattern: /\bOpenXLA\b|\bIREE\b|\bMLIR\b|\bApache TVM\b|\bTVM\b/i,
    score: 2,
    tag: "AI Compiler",
  },
  {
    pattern: /\bPULP\b|\bSnitch\b|\bAra\b|\bMemPool\b|\bPULP-NN\b/i,
    score: 3,
    tag: "PULP",
  },
  { pattern: /\bGemmini\b/i, score: 3, tag: "Gemmini" },
  { pattern: /\bKenning\b/i, score: 2, tag: "Kenning" },

  { pattern: /\bOpenHW\b/i, score: 5, tag: "OpenHW" },
  { pattern: /\bCORE-V\b/i, score: 5, tag: "CORE-V" },
  { pattern: /\bCVA6\b/i, score: 5, tag: "CVA6" },
  { pattern: /\bCV32E40[PSX]?\b/i, score: 5, tag: "CV32E40" },
  { pattern: /\bCV32E20\b/i, score: 5, tag: "CV32E20" },
  { pattern: /\bCVW\b/i, score: 4, tag: "CVW" },
  { pattern: /\bCVFPU\b/i, score: 4, tag: "CVFPU" },
  { pattern: /\bRISC-V\b|\bRISCV\b/i, score: 4, tag: "RISC-V" },
  { pattern: /\bCHIPS Alliance\b/i, score: 3, tag: "CHIPS Alliance" },
  { pattern: /\bFOSSi\b/i, score: 3, tag: "FOSSi" },
  { pattern: /\blowRISC\b/i, score: 3, tag: "lowRISC" },
  { pattern: /\bOpenTitan\b/i, score: 4, tag: "OpenTitan" },
  { pattern: /\bCaliptra\b/i, score: 4, tag: "Caliptra" },
  { pattern: /\bVeeR\b|\bSweRV\b/i, score: 3, tag: "VeeR" },
  { pattern: /\bKeystone\b/i, score: 3, tag: "Keystone" },
  { pattern: /\bIbex\b/i, score: 3, tag: "Ibex" },
  { pattern: /\bCHERI\b|\bCHERIoT\b/i, score: 3, tag: "CHERI" },
  { pattern: /\bYosys\b/i, score: 3, tag: "Yosys" },
  { pattern: /\bVerilator\b/i, score: 3, tag: "Verilator" },
  { pattern: /\bOpenROAD\b/i, score: 3, tag: "OpenROAD" },
  { pattern: /\bOpenLane\b/i, score: 3, tag: "OpenLane" },
  { pattern: /\bcocotb\b/i, score: 3, tag: "cocotb" },
  { pattern: /\bSystemVerilog\b|\bUVM\b|\bRISCV-DV\b/i, score: 2, tag: "Verification" },
  { pattern: /\bEDA\b|synthesis|simulation|physical design|formal/i, score: 2, tag: "EDA" },
  { pattern: /\bSoC\b|subsystem|\bIP\b|\bRTL\b/i, score: 2, tag: "SoC/IP" },
  {
    pattern: /root of trust|secure|security|cryptography|enclave|attestation/i,
    score: 2,
    tag: "Security",
  },
  { pattern: /open.?source hardware|open silicon/i, score: 2, tag: "Open Hardware" },
];

function decodeEntities(text = "") {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#8211;|&#x2013;/g, "-")
    .replace(/&#8212;|&#x2014;/g, "-")
    .replace(/&#8217;|&#x2019;/g, "'")
    .replace(/&#8220;|&#x201C;/g, '"')
    .replace(/&#8221;|&#x201D;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripHtml(text = "") {
  return decodeEntities(text)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text = "", len = 220) {
  const clean = stripHtml(text);
  return clean.length > len ? `${clean.slice(0, len).trim()}...` : clean;
}

function toIsoDate(value) {
  if (!value) return "";
  const date = new Date(stripHtml(String(value)));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function isWithinLookback(value, since = SINCE) {
  const date = new Date(value);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getTime() >= since.getTime() &&
    date.getTime() <= Date.now() + DAY_MS
  );
}

function isLowSignalRelease(release) {
  if (release.draft) return true;
  if (release.prerelease) return true;

  const name = `${release.name || ""}`.trim();
  const tag = `${release.tag_name || ""}`.trim();
  const body = `${release.body || ""}`;
  const combined = `${name} ${tag} ${body}`;

  if (/^(test|debug|tmp|temp)([-_\s]|\d|$)/i.test(name)) return true;
  if (/^(test|debug|tmp|temp)([-_\s]|\d|$)/i.test(tag)) return true;
  if (/^cert-docs-\d{4}/i.test(tag)) return true;
  if (/automated release of the certification documents/i.test(combined)) return true;
  if (/(nightly|dev20\d{6}|rc20\d{6}|candidate.*20\d{6})/i.test(combined)) return true;
  if (/(^|[-_.\s])rc\d*(?:[-_.\s]|$)/i.test(combined)) return true;
  if (/\d+rc\d+/i.test(combined)) return true;
  if (/\brelease candidate\b/i.test(combined)) return true;

  return false;
}

function addUnique(list, value) {
  const clean = String(value || "").trim();
  if (clean && !list.includes(clean)) list.push(clean);
}

function scoreText(title, summary = "", defaultTags = [], defaultScore = 0) {
  const text = `${title} ${summary}`;
  let score = defaultScore;
  const tags = [];

  for (const tag of defaultTags) addUnique(tags, tag);

  for (const keyword of KEYWORDS) {
    if (keyword.pattern.test(text)) {
      score += keyword.score;
      addUnique(tags, keyword.tag);
    }
  }

  return { score, tags };
}

function detectAudience(tags = [], title = "", source = "") {
  const text = `${tags.join(" ")} ${title} ${source}`;
  const audiences = [];
  if (/OpenHW|CORE-V|CVA6|CV32|CVW|CVFPU|RISC-V/i.test(text)) addUnique(audiences, "openhw-riscv");
  if (
    /AI\b|machine learning|\bML\b|LLM|inference|accelerator|NPU|TPU|tensor|Tenstorrent|TT-Metal|OpenXLA|IREE|TVM|MLIR|PULP|Snitch|Ara|MemPool|Kenning/i.test(
      text,
    )
  )
    addUnique(audiences, "ai-accelerators");
  if (/Verification|UVM|SystemVerilog|RISCV-DV|cocotb|Architecture Tests|formal/i.test(text))
    addUnique(audiences, "verification");
  if (/Yosys|Verilator|OpenROAD|OpenLane|EDA|Synthesis|Simulation|Physical Design/i.test(text))
    addUnique(audiences, "eda-tools");
  if (/Caliptra|OpenTitan|Keystone|Security|Root of Trust|CHERI|enclave|cryptography/i.test(text))
    addUnique(audiences, "security");
  if (/SoC|IP|RTL|VeeR|Ibex|Topwrap|Guineveer|subsystem|Core/i.test(text))
    addUnique(audiences, "soc-ip");
  return audiences.length ? audiences : ["general"];
}

function candidateFromRaw(raw, defaults = {}) {
  const title = stripHtml(raw.title || "");
  const summary = truncate(raw.summary || raw.body || "");
  if (!title || !raw.url) return null;

  const { score, tags } = scoreText(
    title,
    summary,
    [...(defaults.tags || []), ...(raw.tags || [])],
    defaults.defaultScore || 0,
  );

  const publishedAt = toIsoDate(raw.publishedAt || raw.createdAt || raw.date || "");
  const source = raw.source || defaults.source || "Open hardware source";
  const item = {
    title,
    url: raw.url,
    source,
    sourceType: raw.sourceType || defaults.sourceType || "web",
    sourceTier: raw.sourceTier || defaults.sourceTier || "trusted",
    publishedAt,
    summary,
    author: raw.author || "",
    relevanceScore: score,
    tags: tags.slice(0, 8),
    suggestedAudience: detectAudience(tags, title, source),
    reviewStatus: "candidate",
    reviewAction: "Review and copy selected facts into src/data/curated-news.json",
  };

  return item;
}

async function fetchText(url, headers = HTTP_HEADERS) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: GITHUB_HEADERS,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function readTag(block, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function parseFeed(xml, source) {
  const candidates = [];
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
  const entryBlocks = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];

  for (const block of itemBlocks) {
    const title = readTag(block, "title");
    const link = stripHtml(readTag(block, "link"));
    const publishedAt = readTag(block, "pubDate") || readTag(block, "dc:date");
    const summary = readTag(block, "description") || readTag(block, "content:encoded");
    const author = stripHtml(readTag(block, "dc:creator") || readTag(block, "author"));
    candidates.push({ title, url: link, publishedAt, summary, author });
  }

  for (const block of entryBlocks) {
    const title = readTag(block, "title");
    const href = block.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] || "";
    const publishedAt = readTag(block, "updated") || readTag(block, "published");
    const summary = readTag(block, "summary") || readTag(block, "content");
    const author = stripHtml(readTag(block, "name") || readTag(block, "author"));
    candidates.push({ title, url: href, publishedAt, summary, author });
  }

  return candidates
    .map((item) =>
      candidateFromRaw(item, {
        source: source.name,
        sourceType: "rss",
        sourceTier: source.sourceTier,
        tags: source.defaultTags,
        defaultScore: source.defaultScore,
      }),
    )
    .filter(Boolean);
}

function parseOpenHwNews(html, source) {
  const blocks = html.match(/<article class="elementor-post[\s\S]*?<\/article>/gi) || [];
  return blocks
    .map((block) => {
      const titleMatch = block.match(
        /elementor-post__title[\s\S]*?<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i,
      );
      const summaryMatch = block.match(/elementor-post__excerpt">\s*<p>([\s\S]*?)<\/p>/i);
      const dateMatch = block.match(/elementor-post-date">\s*([\s\S]*?)\s*<\/span>/i);
      const tagMatches = [...block.matchAll(/\bcategory-([a-z0-9-]+)/gi)]
        .map((match) => match[1].replace(/-/g, " "))
        .filter((tag) => !/^(blog|tech announcement|openhw tv|new member announcement)$/i.test(tag));

      if (!titleMatch) return null;

      const publishedAt = dateMatch ? `${stripHtml(dateMatch[1])} UTC` : "";

      return candidateFromRaw(
        {
          title: titleMatch[2],
          url: titleMatch[1],
          publishedAt,
          summary: summaryMatch ? summaryMatch[1] : "",
          tags: tagMatches,
        },
        {
          source: source.name,
          sourceType: "web-page",
          sourceTier: source.sourceTier,
          tags: source.defaultTags,
          defaultScore: source.defaultScore,
        },
      );
    })
    .filter(Boolean);
}

function parseChipsBlog(html, source) {
  const blocks = html.match(/<article class=blog-post>[\s\S]*?<\/article>/gi) || [];
  return blocks
    .map((block) => {
      const titleMatch = block.match(
        /blog-post-title[^>]*>\s*<a href=("[^"]+"|'[^']+'|[^ >]+)>([\s\S]*?)<\/a>/i,
      );
      const dateMatch = block.match(/blog-post-date[^>]*>([\s\S]*?)<\/div>/i);
      const tagMatches = [...block.matchAll(/class="badge[^"]*"[^>]*>(#[^<]+)<\/a>/gi)].map(
        (match) => stripHtml(match[1]).replace(/^#/, ""),
      );
      if (!titleMatch) return null;
      const rawUrl = titleMatch[1].replace(/^["']|["']$/g, "");
      const title = titleMatch[2];
      return candidateFromRaw(
        {
          title,
          url: new URL(rawUrl, source.url).href,
          publishedAt: dateMatch ? dateMatch[1] : "",
          tags: tagMatches,
        },
        {
          source: source.name,
          sourceType: "web-page",
          sourceTier: source.sourceTier,
          tags: source.defaultTags,
          defaultScore: source.defaultScore,
        },
      );
    })
    .filter(Boolean);
}

function parseLowriscNews(html, source) {
  const regex =
    /<h6 class="wp-block-post-title">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h6>\s*<div class="wp-block-post-date[^"]*"[^>]*>\s*<time datetime="([^"]+)"/gi;
  return [...html.matchAll(regex)]
    .map((match) =>
      candidateFromRaw(
        {
          title: match[2],
          url: match[1],
          publishedAt: match[3],
        },
        {
          source: source.name,
          sourceType: "web-page",
          sourceTier: source.sourceTier,
          tags: source.defaultTags,
          defaultScore: source.defaultScore,
        },
      ),
    )
    .filter(Boolean);
}

function parseOcpBlog(html, source) {
  const blocks = html.match(/<article class="news-article panel[\s\S]*?<\/article>/gi) || [];
  return blocks
    .map((block) => {
      const titleMatch = block.match(
        /news-article__title">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i,
      );
      const dateMatch = block.match(/<time>([\s\S]*?)<\/time>/i);
      const summaryMatch = block.match(
        /<section class="news-article__body">([\s\S]*?)<\/section>/i,
      );
      const tagMatches = [...block.matchAll(/blog\/category\/[^"]+">([^<]+)<\/a>/gi)].map((match) =>
        stripHtml(match[1]),
      );

      if (!titleMatch) return null;

      return candidateFromRaw(
        {
          title: titleMatch[2],
          url: titleMatch[1],
          publishedAt: dateMatch ? dateMatch[1] : "",
          summary: summaryMatch ? summaryMatch[1] : "",
          tags: tagMatches,
        },
        {
          source: source.name,
          sourceType: "web-page",
          sourceTier: source.sourceTier,
          tags: source.defaultTags,
          defaultScore: source.defaultScore,
        },
      );
    })
    .filter(Boolean);
}

function getOpenHwReposFromProjects() {
  const content = readFileSync(PROJECTS_FILE, "utf-8");
  const repos = [
    ...content.matchAll(/github:\s*"https:\/\/github\.com\/openhwgroup\/([^"]+)"/g),
  ].map((match) => `openhwgroup/${match[1].replace(/\/$/, "")}`);
  return [...new Set(repos)].sort();
}

function tagsForOpenHwRepo(repoName) {
  const name = repoName.replace(/^openhwgroup\//, "");
  const tags = ["OpenHW"];
  if (/cva6/i.test(name)) tags.push("CVA6", "CORE-V", "RISC-V", "Core");
  if (/cv32e40/i.test(name)) tags.push("CV32E40", "CORE-V", "RISC-V", "Core");
  if (/cv32e20|cve2/i.test(name)) tags.push("CV32E20", "CORE-V", "RISC-V", "Core");
  if (/cvw/i.test(name)) tags.push("CVW", "RISC-V", "Core");
  if (/cvfpu/i.test(name)) tags.push("CVFPU", "IP");
  if (/verif|uvm|dv|force/i.test(name)) tags.push("Verification", "UVM");
  if (/mcu|polara|safe/i.test(name)) tags.push("SoC");
  if (/gcc|llvm|binutils|sdk|freertos/i.test(name)) tags.push("Toolchain");
  if (/xif|mesh|hpdcache/i.test(name)) tags.push("IP");
  return [...new Set(tags)];
}

async function collectRssCandidates() {
  const all = [];
  for (const source of RSS_SOURCES) {
    try {
      const xml = await fetchText(source.url);
      all.push(...parseFeed(xml, source));
      console.log(`  RSS: ${source.name}`);
    } catch (error) {
      console.warn(`  RSS warning: ${source.name}: ${error.message}`);
    }
  }
  return all;
}

async function collectHtmlCandidates() {
  const all = [];
  for (const source of HTML_SOURCES) {
    try {
      const html = await fetchText(source.url);
      if (source.parser === "openhw") {
        all.push(...parseOpenHwNews(html, source));
      } else if (source.parser === "chips") {
        all.push(...parseChipsBlog(html, source));
      } else if (source.parser === "lowrisc") {
        all.push(...parseLowriscNews(html, source));
      } else if (source.parser === "ocp") {
        all.push(...parseOcpBlog(html, source));
      }
      console.log(`  Web: ${source.name}`);
    } catch (error) {
      console.warn(`  Web warning: ${source.name}: ${error.message}`);
    }
  }
  return all;
}

async function collectGithubReleases(openHwRepos) {
  const all = [];
  const repos = [
    ...(FETCH_OPENHW_REPO_RELEASES
      ? openHwRepos.map((repo) => ({
          repo,
          source: `OpenHW / ${repo.replace(/^openhwgroup\//, "")} (GitHub)`,
          tags: tagsForOpenHwRepo(repo),
          tier: "official",
        }))
      : []),
    ...RELEASE_REPOS,
  ];

  if (!FETCH_OPENHW_REPO_RELEASES) {
    console.log("  GitHub releases: OpenHW per-repo scan skipped without GITHUB_TOKEN");
  }

  for (const repoInfo of repos) {
    try {
      const releases = await fetchJson(
        `https://api.github.com/repos/${repoInfo.repo}/releases?per_page=5`,
      );
      let addedForRepo = 0;
      for (const release of releases) {
        if (isLowSignalRelease(release)) continue;
        const publishedAt = release.published_at || release.created_at || "";
        if (!isWithinLookback(publishedAt)) continue;
        const releaseName = release.name || release.tag_name;
        const title = `${repoInfo.repo} release: ${releaseName}`;
        const item = candidateFromRaw(
          {
            title,
            url: release.html_url,
            publishedAt,
            summary: release.body || "",
            author: release.author?.login || "",
          },
          {
            source: repoInfo.source,
            sourceType: "github-release",
            sourceTier: repoInfo.tier,
            tags: repoInfo.tags,
            defaultScore: repoInfo.tier === "official" ? 2 : 1,
          },
        );
        if (item) {
          all.push(item);
          addedForRepo += 1;
        }
        if (addedForRepo >= MAX_RELEASES_PER_REPO) break;
      }
      console.log(`  GitHub releases: ${repoInfo.repo}`);
    } catch (error) {
      console.warn(`  GitHub release warning: ${repoInfo.repo}: ${error.message}`);
    }
  }

  return all;
}

async function collectOpenHwActivity() {
  try {
    const events = await fetchJson("https://api.github.com/orgs/openhwgroup/events?per_page=100");
    const grouped = new Map();
    const releases = [];

    for (const event of events) {
      if (!isWithinLookback(event.created_at, OPENHW_ACTIVITY_SINCE)) continue;
      const repo = event.repo?.name || "";
      if (!repo.startsWith("openhwgroup/")) continue;

      if (event.type === "ReleaseEvent" && event.payload?.release?.html_url) {
        const release = event.payload.release;
        const item = candidateFromRaw(
          {
            title:
              `OpenHW release: ${repo.replace(/^openhwgroup\//, "")} ${release.name || release.tag_name || ""}`.trim(),
            url: release.html_url,
            publishedAt: event.created_at,
            summary: release.body || "",
            author: event.actor?.login || "",
          },
          {
            source: "OpenHW GitHub org events",
            sourceType: "github-release-event",
            sourceTier: "official",
            tags: tagsForOpenHwRepo(repo),
            defaultScore: 3,
          },
        );
        if (item) releases.push(item);
      }

      if (event.type === "PushEvent" && Array.isArray(event.payload?.commits)) {
        const current = grouped.get(repo) || {
          repo,
          latestAt: event.created_at,
          count: 0,
          messages: [],
          actors: new Set(),
        };
        current.latestAt =
          current.latestAt > event.created_at ? current.latestAt : event.created_at;
        current.count += event.payload.commits.length;
        if (event.actor?.login) current.actors.add(event.actor.login);
        for (const commit of event.payload.commits.slice(0, 3)) {
          addUnique(current.messages, stripHtml(commit.message || "").split("\n")[0]);
        }
        grouped.set(repo, current);
      }
    }

    const activity = [...grouped.values()]
      .sort((a, b) => b.latestAt.localeCompare(a.latestAt))
      .slice(0, 12)
      .map((entry) =>
        candidateFromRaw(
          {
            title: `OpenHW repo activity: ${entry.repo.replace(/^openhwgroup\//, "")} received ${entry.count} recent commit${entry.count === 1 ? "" : "s"}`,
            url: `https://github.com/${entry.repo}/commits`,
            publishedAt: entry.latestAt,
            summary: entry.messages.slice(0, 3).join("; "),
            author: [...entry.actors].slice(0, 3).join(", "),
          },
          {
            source: "OpenHW GitHub org commits",
            sourceType: "github-commit-activity",
            sourceTier: "official",
            tags: tagsForOpenHwRepo(entry.repo),
            defaultScore: 2,
          },
        ),
      )
      .filter(Boolean);

    console.log("  GitHub org events: openhwgroup");
    return [...releases, ...activity];
  } catch (error) {
    console.warn(`  GitHub org warning: openhwgroup: ${error.message}`);
    return [];
  }
}

function dedupeCandidates(items) {
  const byKey = new Map();
  for (const item of items) {
    if (!item.url && !item.title) continue;
    const normalizedTitle = item.title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
    const key = item.url || `${item.source}:${normalizedTitle}`;
    const titleKey = normalizedTitle ? `title:${normalizedTitle}` : "";
    const previous = byKey.get(key);
    const previousByTitle = titleKey ? byKey.get(titleKey) : null;
    const bestPrevious = choosePreferredCandidate(previous, previousByTitle);

    if (!bestPrevious || isPreferredCandidate(item, bestPrevious)) {
      if (previousByTitle?.url && previousByTitle.url !== key) byKey.delete(previousByTitle.url);
      if (previous?.url && previous.url !== key) byKey.delete(previous.url);
      byKey.set(key, item);
      if (titleKey) byKey.set(titleKey, item);
    }
  }
  return [...new Map([...byKey.values()].map((item) => [item.url || item.title, item])).values()];
}

function sourceTierRank(tier) {
  if (tier === "official") return 3;
  if (tier === "trusted") return 2;
  return 1;
}

function choosePreferredCandidate(...items) {
  return items.filter(Boolean).sort((a, b) => (isPreferredCandidate(a, b) ? -1 : 1))[0] || null;
}

function isPreferredCandidate(candidate, previous) {
  const tierDelta = sourceTierRank(candidate.sourceTier) - sourceTierRank(previous.sourceTier);
  if (tierDelta !== 0) return tierDelta > 0;
  if (candidate.relevanceScore !== previous.relevanceScore) {
    return candidate.relevanceScore > previous.relevanceScore;
  }
  return (candidate.publishedAt || "").localeCompare(previous.publishedAt || "") > 0;
}

function sourceSummary(items) {
  const map = new Map();
  for (const item of items) {
    map.set(item.source, (map.get(item.source) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([source, count]) => ({ source, count }));
}

async function main() {
  console.log("Collecting OpenHW Explorer news candidates...");
  console.log(`  Lookback: ${LOOKBACK_DAYS} days`);

  const openHwRepos = getOpenHwReposFromProjects();
  const collected = [
    ...(await collectRssCandidates()),
    ...(await collectHtmlCandidates()),
    ...(await collectGithubReleases(openHwRepos)),
    ...(await collectOpenHwActivity()),
  ];

  const candidates = dedupeCandidates(collected)
    .filter((item) => item.relevanceScore >= 2)
    .filter((item) => !item.publishedAt || isWithinLookback(item.publishedAt))
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
      return (b.publishedAt || "").localeCompare(a.publishedAt || "");
    })
    .slice(0, MAX_ITEMS);

  const payload = {
    _meta: {
      generatedAt: new Date().toISOString(),
      lookbackDays: LOOKBACK_DAYS,
      openHwActivityDays: OPENHW_ACTIVITY_DAYS,
      totalCandidates: candidates.length,
      sourceCount: new Set(candidates.map((item) => item.source)).size,
      reviewWorkflow:
        "Review candidates, verify source facts, copy selected items into src/data/curated-news.json, then run npm run build-news.",
    },
    sources: sourceSummary(candidates),
    items: candidates,
  };

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2) + "\n");

  console.log(`\n  Wrote ${candidates.length} candidates to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
