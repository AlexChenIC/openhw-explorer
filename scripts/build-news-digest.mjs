#!/usr/bin/env node

/**
 * News Digest Builder for OpenHW Explorer
 *
 * Reads TrendRadar's SQLite databases (RSS + news) and generates
 * a structured JSON digest with:
 *   - Weekly highlights organized by category (bilingual)
 *   - Full news feed with relevance scoring
 *
 * Usage:
 *   node scripts/build-news-digest.mjs
 *
 * Input:
 *   tools/TrendRadar/output/rss/*.db   (RSS data)
 *   tools/TrendRadar/output/news/*.db  (hotlist data)
 *
 * Output:
 *   src/data/news-digest.json
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TRENDRADAR_DIR = join(ROOT, "tools/TrendRadar/output");
const OUTPUT_FILE = join(ROOT, "src/data/news-digest.json");
const CURATED_FILE = join(ROOT, "src/data/curated-news.json");

const DAYS_TO_INCLUDE = 7;

const SOURCE_TIER_RULES = [
  { pattern: /RISC-V International|FOSSi|CHIPS Alliance|OpenHW/i, tier: "official" },
  { pattern: /GitHub|EE Times|EE Journal|Phoronix|Hackaday|SemiWiki|Tom's Hardware/i, tier: "trusted" },
  { pattern: /.*/, tier: "community" },
];

// ─── Relevance scoring keywords ─────────────────────────────

const RELEVANCE_KEYWORDS = [
  // OpenHW direct (score: 4)
  { pattern: /\bOpenHW\b/i, score: 4, tag: "OpenHW" },
  { pattern: /\bCORE-V\b/i, score: 4, tag: "CORE-V" },
  { pattern: /\bCVA6\b/i, score: 4, tag: "CVA6" },
  { pattern: /\bCV32E40[PSX]\b/i, score: 4, tag: "CV32E40" },
  { pattern: /\bCVW\b/i, score: 4, tag: "CVW" },
  { pattern: /\bCVFPU\b/i, score: 4, tag: "CVFPU" },

  // RISC-V ecosystem (score: 3)
  { pattern: /\bRISC-V\b/i, score: 3, tag: "RISC-V" },
  { pattern: /\bRISCV\b/i, score: 3, tag: "RISC-V" },
  { pattern: /\bOpenTitan\b/i, score: 3, tag: "OpenTitan" },
  { pattern: /\bChipyard\b/i, score: 3, tag: "Chipyard" },
  { pattern: /\blowRISC\b/i, score: 3, tag: "lowRISC" },
  { pattern: /香山|XiangShan/i, score: 3, tag: "XiangShan" },
  { pattern: /\bRocket.?Chip\b/i, score: 3, tag: "Rocket Chip" },
  { pattern: /\bBOOM\b/, score: 3, tag: "BOOM" },
  { pattern: /\bPULP\b/i, score: 3, tag: "PULP" },

  // Open hardware orgs & tools (score: 2)
  { pattern: /\bSiFive\b/i, score: 2, tag: "SiFive" },
  { pattern: /\bVerilator\b/i, score: 2, tag: "Verilator" },
  { pattern: /open.?source.*hardware/i, score: 2, tag: "Open Hardware" },
  { pattern: /开源硬件/i, score: 2, tag: "Open Hardware" },
  { pattern: /开源芯片/i, score: 2, tag: "Open Chip" },
  { pattern: /\bCHIPS Alliance\b/i, score: 2, tag: "CHIPS Alliance" },
  { pattern: /\bFOSSi\b/i, score: 2, tag: "FOSSi" },
  { pattern: /\bCaliptra\b/i, score: 2, tag: "Caliptra" },
  { pattern: /\bTenstorrent\b/i, score: 2, tag: "Tenstorrent" },
  { pattern: /\bEspressif\b/i, score: 2, tag: "Espressif" },
  { pattern: /\bStarFive\b/i, score: 2, tag: "StarFive" },
  { pattern: /平头哥|T-Head/i, score: 2, tag: "T-Head" },
  { pattern: /芯来|Nuclei/i, score: 2, tag: "Nuclei" },
  { pattern: /\bCodasip\b/i, score: 2, tag: "Codasip" },
  { pattern: /\bEsperanto/i, score: 2, tag: "Esperanto" },
  { pattern: /\bLiteX\b/i, score: 2, tag: "LiteX" },
  { pattern: /\bSpinalHDL\b/i, score: 2, tag: "SpinalHDL" },
  { pattern: /\bAmaranth\b.*HDL|amaranth-lang/i, score: 2, tag: "Amaranth" },
  { pattern: /\bcocotb\b/i, score: 2, tag: "cocotb" },
  { pattern: /\bOpenLane\b/i, score: 2, tag: "OpenLane" },
  { pattern: /\bKLayout\b/i, score: 2, tag: "KLayout" },
  { pattern: /北京开芯院|BOSC\b/i, score: 2, tag: "BOSC" },

  // Broader semiconductor & EDA (score: 1)
  { pattern: /\bFPGA\b/i, score: 1, tag: "FPGA" },
  { pattern: /\bEDA\b/i, score: 1, tag: "EDA" },
  { pattern: /semiconductor/i, score: 1, tag: "Semiconductor" },
  { pattern: /半导体/i, score: 1, tag: "Semiconductor" },
  { pattern: /芯片/i, score: 1, tag: "Chip" },
  { pattern: /\bSoC\b/i, score: 1, tag: "SoC" },
  { pattern: /tape.?out|流片/i, score: 1, tag: "Tape-out" },
  { pattern: /\bUVM\b/i, score: 1, tag: "UVM" },
  { pattern: /\bYosys\b/i, score: 1, tag: "Yosys" },
  { pattern: /\bOpenROAD\b/i, score: 1, tag: "OpenROAD" },
  { pattern: /\bChisel\b/i, score: 1, tag: "Chisel" },
  { pattern: /silicon/i, score: 1, tag: "Silicon" },
];

// ─── Category definitions (bilingual) ───────────────────────

const CATEGORIES = [
  {
    id: "releases",
    en: "Project Releases",
    zh: "项目发布",
    icon: "rocket",
    matchSource: /(GitHub|Releases)/i,
  },
  {
    id: "riscv",
    en: "RISC-V Ecosystem",
    zh: "RISC-V 生态",
    icon: "cpu",
    matchTag: /RISC-V|OpenHW|CORE-V|CVA6|CV32|CVW|OpenTitan|Chipyard|lowRISC|XiangShan|Rocket Chip|BOOM|PULP|BOSC/,
  },
  {
    id: "industry",
    en: "Industry & Market",
    zh: "产业动态",
    icon: "trending",
    matchSource: /SemiWiki|EE Times|Semiconductor|EE Journal|WikiChip|Phoronix|Tom's Hardware/i,
    matchTag: /Semiconductor|Silicon|Tape-out|SiFive|Tenstorrent|StarFive|Espressif|T-Head|Nuclei|Codasip|Esperanto/,
  },
  {
    id: "hardware",
    en: "Hardware & Embedded",
    zh: "硬件与嵌入式",
    icon: "circuit",
    matchSource: /CNX|Hackaday|Embedded|Adafruit/i,
    matchTag: /FPGA|SoC|Open Hardware|EDA|LiteX|SpinalHDL|Amaranth/,
  },
  {
    id: "community",
    en: "Community & Tools",
    zh: "社区与工具",
    icon: "users",
    matchSource: /RISC-V International|FOSSi|CHIPS Alliance|lowRISC|YosysHQ|Codasip/i,
    matchTag: /FOSSi|CHIPS Alliance|Caliptra|cocotb|OpenLane|KLayout|Yosys|OpenROAD|Chisel/,
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function computeRelevanceScore(title, summary = "") {
  const text = `${title} ${summary}`;
  let score = 0;
  const matchedTags = new Set();

  for (const kw of RELEVANCE_KEYWORDS) {
    if (kw.pattern.test(text)) {
      score += kw.score;
      matchedTags.add(kw.tag);
    }
  }

  return { score, tags: [...matchedTags] };
}

function classifyItem(item) {
  for (const cat of CATEGORIES) {
    if (cat.matchSource && cat.matchSource.test(item.source)) return cat.id;
    if (cat.matchTag && item.tags.some((t) => cat.matchTag.test(t))) return cat.id;
  }
  return "hardware"; // default fallback
}

function getDateRange() {
  const dates = [];
  const now = new Date();
  for (let i = -1; i < DAYS_TO_INCLUDE; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function truncate(text, len = 160) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len) + "..." : text;
}

function toIsoDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function isWithinRecencyWindow(value, days = DAYS_TO_INCLUDE) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = Date.now();
  const diff = now - date.getTime();
  const maxAgeMs = days * 24 * 60 * 60 * 1000;
  return diff >= 0 && diff <= maxAgeMs;
}

function classifySourceTier(source = "") {
  for (const rule of SOURCE_TIER_RULES) {
    if (rule.pattern.test(source)) {
      return rule.tier;
    }
  }
  return "community";
}

// ─── Database readers ────────────────────────────────────────

function readRSSData(dates) {
  const rssDir = join(TRENDRADAR_DIR, "rss");
  if (!existsSync(rssDir)) return [];

  const items = [];
  const seenUrls = new Set();

  for (const date of dates) {
    const dbPath = join(rssDir, `${date}.db`);
    if (!existsSync(dbPath)) continue;

    try {
      const db = new Database(dbPath, { readonly: true });
      const feeds = {};
      try {
        for (const f of db.prepare("SELECT id, name FROM rss_feeds").all()) {
          feeds[f.id] = f.name;
        }
      } catch { /* table may not exist */ }

      try {
        const rows = db
          .prepare(
            "SELECT title, feed_id, url, published_at, summary, author FROM rss_items ORDER BY published_at DESC",
          )
          .all();

        for (const row of rows) {
          if (seenUrls.has(row.url)) continue;
          seenUrls.add(row.url);

          const { score, tags } = computeRelevanceScore(row.title, row.summary || "");
          const publishedAtIso = toIsoDateTime(row.published_at || "");
          items.push({
            title: row.title,
            url: row.url,
            source: feeds[row.feed_id] || row.feed_id,
            publishedAt: publishedAtIso || "",
            summary: truncate(row.summary),
            author: row.author || "",
            relevanceScore: score,
            tags,
            language: /[\u4e00-\u9fff]/.test(row.title) ? "zh" : "en",
            sourceTier: classifySourceTier(feeds[row.feed_id] || row.feed_id),
            reviewStatus: "auto",
            _dataSource: "rss",
          });
        }
      } catch { /* table may not exist */ }
      db.close();
    } catch (err) {
      console.log(`  Warning: Could not read ${dbPath}: ${err.message}`);
    }
  }
  return items;
}

function readNewsData(dates) {
  const newsDir = join(TRENDRADAR_DIR, "news");
  if (!existsSync(newsDir)) return [];

  const items = [];
  const seenTitles = new Set();

  for (const date of dates) {
    const dbPath = join(newsDir, `${date}.db`);
    if (!existsSync(dbPath)) continue;

    try {
      const db = new Database(dbPath, { readonly: true });
      const platforms = {};
      try {
        for (const p of db.prepare("SELECT id, name FROM platforms").all()) {
          platforms[p.id] = p.name;
        }
      } catch { /* table may not exist */ }

      try {
        const rows = db
          .prepare(
            "SELECT title, platform_id, url, first_crawl_time FROM news_items ORDER BY first_crawl_time DESC",
          )
          .all();

        for (const row of rows) {
          if (seenTitles.has(row.title)) continue;
          seenTitles.add(row.title);

          const { score, tags } = computeRelevanceScore(row.title, "");
          if (score > 0) {
            const publishedAtIso = toIsoDateTime(
              date + "T" + (row.first_crawl_time || "00:00").replace(/-/g, ":"),
            );

            items.push({
              title: row.title,
              url: row.url || "",
              source: platforms[row.platform_id] || row.platform_id,
              publishedAt: publishedAtIso || "",
              summary: "",
              author: "",
              relevanceScore: score,
              tags,
              language: /[\u4e00-\u9fff]/.test(row.title) ? "zh" : "en",
              sourceTier: classifySourceTier(platforms[row.platform_id] || row.platform_id),
              reviewStatus: "auto",
              _dataSource: "hotlist",
            });
          }
        }
      } catch { /* table may not exist */ }
      db.close();
    } catch (err) {
      console.log(`  Warning: Could not read ${dbPath}: ${err.message}`);
    }
  }
  return items;
}

// ─── Curated items reader ────────────────────────────────────

function readCuratedData() {
  if (!existsSync(CURATED_FILE)) return [];

  try {
    const raw = JSON.parse(readFileSync(CURATED_FILE, "utf-8"));
    const items = raw.items || [];
    if (items.length === 0) return [];

    console.log(`  Curated items: ${items.length}`);

    return items.map((item) => {
      // Auto-compute tags from title+summary if not provided
      const { score, tags: autoTags } = computeRelevanceScore(
        item.title || "",
        item.summary || "",
      );

      return {
        title: item.title || "",
        url: item.url || "",
        source: item.source || "OpenHW Community",
        publishedAt: toIsoDateTime(item.addedAt || new Date().toISOString()) || "",
        summary: truncate(item.summary || item.summaryZh || ""),
        author: item.author || "",
        relevanceScore: Math.max(score, 5), // curated items always high relevance
        tags: item.tags && item.tags.length > 0 ? item.tags : autoTags,
        language: item.language || (/[\u4e00-\u9fff]/.test(item.title) ? "zh" : "en"),
        sourceTier: "official",
        reviewStatus: "curated",
        curated: true,
        // bilingual fields (pass through to JSON output)
        ...(item.titleZh && { titleZh: item.titleZh }),
        ...(item.summaryZh && { summaryZh: item.summaryZh }),
        _dataSource: "curated",
      };
    });
  } catch (err) {
    console.log(`  Warning: Could not read curated file: ${err.message}`);
    return [];
  }
}

// ─── Highlights generator ────────────────────────────────────

function generateHighlights(items) {
  // Group relevant items (score >= 2) by category
  const relevant = items.filter((i) => i.relevanceScore >= 2);
  const grouped = {};

  for (const item of relevant) {
    const catId = classifyItem(item);
    if (!grouped[catId]) grouped[catId] = [];
    grouped[catId].push(item);
  }

  // Build highlights array
  const highlights = [];
  for (const cat of CATEGORIES) {
    const catItems = grouped[cat.id];
    if (!catItems || catItems.length === 0) continue;

    // Take top 4 items per category
    const top = catItems.slice(0, 4).map((item) => ({
      title: item.title,
      url: item.url,
      source: item.source,
      tags: item.tags.slice(0, 3),
      publishedAt: item.publishedAt,
    }));

    highlights.push({
      id: cat.id,
      name: { en: cat.en, zh: cat.zh },
      icon: cat.icon,
      count: catItems.length,
      items: top,
    });
  }

  return highlights;
}

// ─── Weekly stats generator ──────────────────────────────────

function generateWeeklyStats(items) {
  const relevant = items.filter((i) => i.relevanceScore >= 2);
  const sources = new Set(relevant.map((i) => i.source));
  const tags = {};
  for (const item of relevant) {
    for (const tag of item.tags) {
      tags[tag] = (tags[tag] || 0) + 1;
    }
  }
  // Top 5 tags
  const topTags = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

  return {
    totalRelevant: relevant.length,
    totalSources: sources.size,
    topTags,
  };
}

// ─── Main builder ────────────────────────────────────────────

function buildDigest() {
  console.log("Building news digest for OpenHW Explorer...");

  if (!existsSync(TRENDRADAR_DIR)) {
    console.log("  TrendRadar output not found. Creating empty digest.");
    const empty = {
      weekOf: new Date().toISOString().slice(0, 10),
      generatedAt: new Date().toISOString(),
      stats: { totalRelevant: 0, totalSources: 0, topTags: [] },
      highlights: [],
      items: [],
      sources: [],
    };
    writeFileSync(OUTPUT_FILE, JSON.stringify(empty, null, 2));
    return;
  }

  const dates = getDateRange();
  console.log(`  Date range: ${dates[dates.length - 1]} to ${dates[0]}`);

  const rssItems = readRSSData(dates);
  console.log(`  RSS items: ${rssItems.length}`);
  const newsItems = readNewsData(dates);
  console.log(`  Hotlist items: ${newsItems.length}`);
  const curatedItems = readCuratedData();

  // Merge & deduplicate (prefer curated > RSS > hotlist)
  const urlMap = new Map();
  for (const item of [...newsItems, ...rssItems, ...curatedItems]) {
    const key = item.url || item.title;
    if (!urlMap.has(key) || item._dataSource === "curated" ||
        (item._dataSource === "rss" && urlMap.get(key)?._dataSource === "hotlist")) {
      urlMap.set(key, item);
    }
  }

  // Filter by recency (curated items bypass this filter)
  let items = Array.from(urlMap.values()).filter((item) =>
    item._dataSource === "curated" || isWithinRecencyWindow(item.publishedAt),
  );

  // Sort by relevance then date
  items = items.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
    return (b.publishedAt || "").localeCompare(a.publishedAt || "");
  });

  // Generate highlights & stats from all items
  const highlights = generateHighlights(items);
  const stats = generateWeeklyStats(items);

  // For the full feed, keep relevant + capped low relevance
  const highItems = items.filter((i) => i.relevanceScore >= 2);
  const lowItems = items.filter((i) => i.relevanceScore === 1);
  const noItems = items.filter((i) => i.relevanceScore === 0);
  items = [...highItems, ...lowItems.slice(0, 15), ...noItems.slice(0, 5)];

  // Clean internal fields
  items = items.map(({ _dataSource, ...rest }) => rest);

  const sources = [...new Set(items.map((i) => i.source))].sort();

  const digest = {
    weekOf: dates[dates.length - 1],
    generatedAt: new Date().toISOString(),
    stats,
    highlights,
    items,
    sources,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(digest, null, 2));
  console.log(`\n  Digest: ${OUTPUT_FILE}`);
  console.log(`  Highlights: ${highlights.length} categories`);
  console.log(`  Total items: ${items.length} (${highItems.length} relevant)`);
  console.log(`  Sources: ${sources.join(", ")}`);
}

buildDigest();
