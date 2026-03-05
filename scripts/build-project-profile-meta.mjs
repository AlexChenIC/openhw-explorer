#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PROJECTS_FILE = join(ROOT, "src/data/projects.ts");
const PROFILES_DIR = join(ROOT, "docs/repos");
const OUTPUT_FILE = join(ROOT, "src/data/project-profile-meta.json");

const OFFICIAL_SOURCES = [
  { host: "github.com", pathPrefix: "/openhwgroup/", includeSubdomains: false },
  { host: "docs.openhwgroup.org", includeSubdomains: false },
  { host: "openhwgroup.org", includeSubdomains: true },
];

const TRUSTED_SOURCES = [
  { host: "freertos.org", includeSubdomains: true },
  { host: "gcc.gnu.org", includeSubdomains: false },
  { host: "llvm.org", includeSubdomains: true },
  { host: "sourceware.org", includeSubdomains: true },
  { host: "pulp-platform.org", includeSubdomains: true },
  { host: "embecosm.com", includeSubdomains: true },
  { host: "quicklogic.com", includeSubdomains: true },
  { host: "ashling.com", includeSubdomains: true },
  { host: "parallel.princeton.edu", includeSubdomains: false },
  { host: "doi.org", includeSubdomains: true },
  { host: "riscv.org", includeSubdomains: true },
];

function extractProjectIds() {
  const content = readFileSync(PROJECTS_FILE, "utf-8");
  const startMarker = "export const projects: Project[] = [";
  const start = content.indexOf(startMarker);
  const end = content.indexOf("\n];", start);
  const section = start >= 0 && end > start ? content.slice(start, end) : content;
  const ids = [...section.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

function normalizeUrl(raw) {
  return raw.replace(/[),.;\]}>"'`。；，）】]+$/g, "");
}

function extractUrls(content) {
  const urls = [...content.matchAll(/https?:\/\/[^\s)\]]+/g)].map((m) => normalizeUrl(m[0]));
  return [...new Set(urls.filter((url) => !url.includes("api.github.com/")))];
}

function hostMatches(hostname, targetHost, includeSubdomains) {
  if (hostname === targetHost) return true;
  return includeSubdomains ? hostname.endsWith(`.${targetHost}`) : false;
}

function matchesSourceRule(url, rule) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();
    const targetHost = rule.host.toLowerCase();
    const includeSubdomains = rule.includeSubdomains !== false;

    if (!hostMatches(hostname, targetHost, includeSubdomains)) return false;
    if (rule.pathPrefix) {
      return pathname.startsWith(rule.pathPrefix.toLowerCase());
    }
    return true;
  } catch {
    return false;
  }
}

function matchesAnyRule(urls, rules) {
  return urls.some((url) => rules.some((rule) => matchesSourceRule(url, rule)));
}

function classifySourceTier(urls) {
  if (matchesAnyRule(urls, OFFICIAL_SOURCES)) {
    return "official";
  }

  if (matchesAnyRule(urls, TRUSTED_SOURCES)) {
    return "trusted";
  }

  return "community";
}

function computeConfidence(reviewStatus, sourceTier, urlCount) {
  if (reviewStatus === "needs-review") return 0.3;
  if (reviewStatus === "auto") return sourceTier === "official" ? 0.7 : 0.6;

  if (sourceTier === "official") {
    return urlCount >= 3 ? 0.95 : 0.9;
  }
  if (sourceTier === "trusted") {
    return urlCount >= 3 ? 0.85 : 0.8;
  }
  return 0.75;
}

function parseProfile(content) {
  const isTodo = /TODO: 从模板/.test(content);
  const lines = content.split(/\r?\n/);
  const taglineLine = lines.find((line) => line.trim().startsWith(">"));
  const tagline = taglineLine ? taglineLine.replace(/^\s*>\s*/, "").trim() : "";

  const verifiedMatch = content.match(/数据核对日期[:：]\s*(\d{4}-\d{2}-\d{2})/);
  const verifiedAt = verifiedMatch ? verifiedMatch[1] : null;

  const urls = extractUrls(content);
  const hasOverview = /##\s*项目概述/.test(content);

  let reviewStatus = "auto";
  if (isTodo || !hasOverview) {
    reviewStatus = "needs-review";
  } else if (verifiedAt && urls.length > 0) {
    reviewStatus = "reviewed";
  }

  const sourceTier = classifySourceTier(urls);
  const confidence = computeConfidence(reviewStatus, sourceTier, urls.length);

  return {
    tagline,
    reviewStatus,
    sourceTier,
    verifiedAt,
    sourceUrls: urls.slice(0, 8),
    sourceCount: urls.length,
    confidence,
  };
}

function main() {
  const projectIds = extractProjectIds();
  const profiles = {};
  let reviewedCount = 0;
  let needsReviewCount = 0;
  let missingProfileCount = 0;

  for (const id of projectIds) {
    const profilePath = join(PROFILES_DIR, id, "profile.md");
    if (!existsSync(profilePath)) {
      missingProfileCount++;
      needsReviewCount++;
      profiles[id] = {
        tagline: "",
        reviewStatus: "needs-review",
        sourceTier: "community",
        verifiedAt: null,
        sourceUrls: [],
        sourceCount: 0,
        confidence: 0.3,
      };
      continue;
    }

    const parsed = parseProfile(readFileSync(profilePath, "utf-8"));
    if (parsed.reviewStatus === "reviewed") {
      reviewedCount++;
    }
    if (parsed.reviewStatus === "needs-review") {
      needsReviewCount++;
    }
    profiles[id] = parsed;
  }

  const output = {
    _meta: {
      generatedAt: new Date().toISOString(),
      source: "docs/repos/*/profile.md",
      totalProjects: projectIds.length,
      reviewedCount,
      needsReviewCount,
      missingProfileCount,
    },
    profiles,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n");
  console.log(`Built project profile metadata for ${projectIds.length} repos.`);
  console.log(`Reviewed: ${reviewedCount}, Needs review: ${needsReviewCount}`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

main();
