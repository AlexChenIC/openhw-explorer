#!/usr/bin/env node

// Fetches OpenHW repo stats from the GitHub API and writes to src/data/github-stats.json
// Set GITHUB_TOKEN to raise the rate limit to 5000/hr

import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_FILE = join(ROOT, "src/data/github-stats.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ORG = "openhwgroup";
const RECENT_COMMIT_WINDOW_DAYS = 28;

// All repos tracked in projects.ts (extracted from github URLs)
const REPOS = [
  "cva6",
  "cv32e40p",
  "cvw",
  "cv32e40x",
  "cv32e40s",
  "cva5",
  "cve2",
  "cv32e41p",
  "core-v-verif",
  "force-riscv",
  "core-v-mcu-uvm",
  "cv-hpdcache-verif",
  "cvw-arch-verif",
  "cvfpu-uvm",
  "cv32e20-dv",
  "cv32e40s-dv",
  "core-v-mcu",
  "core-v-mcu-devkit",
  "cva6-safe",
  "core-v-polara-apu",
  "cvfpu",
  "cv-hpdcache",
  "core-v-xif",
  "cv-mesh",
  "corev-gcc",
  "corev-binutils-gdb",
  "corev-llvm-project",
  "core-v-sdk",
  "core-v-freertos",
  "core-v-freertos-kernel",
];

const headers = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "openhw-explorer",
};
if (GITHUB_TOKEN) {
  headers.Authorization = `token ${GITHUB_TOKEN}`;
}

const fetchWarnings = [];

function fallbackNumber(fallback, field) {
  const value = fallback?.[field];
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function recordFieldWarning(repoName, field, error) {
  fetchWarnings.push(`${repoName}.${field}: ${error.message}`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await delay(500 * attempt);
      }
    }
  }
  throw lastError;
}

async function fetchJSON(url) {
  const res = await fetchWithRetry(url, { headers });
  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      const resetTime = new Date(res.headers.get("x-ratelimit-reset") * 1000).toLocaleTimeString();
      throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
    }
    throw new Error(`GitHub API error ${res.status}: ${url}`);
  }
  return res.json();
}

async function fetchOpenIssueLabelCount(repoUrl, label) {
  let count = 0;
  let page = 1;

  while (true) {
    const url = `${repoUrl}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=100&page=${page}`;
    const issues = await fetchJSON(url);
    if (!Array.isArray(issues)) return count;

    count += issues.filter((issue) => !issue.pull_request).length;
    if (issues.length < 100) return count;
    page += 1;
  }
}

async function fetchPaginatedCount(url) {
  const separator = url.includes("?") ? "&" : "?";
  const res = await fetchWithRetry(`${url}${separator}per_page=1`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${url}`);
  }

  const linkHeader = res.headers.get("link");
  if (linkHeader) {
    const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (match) return parseInt(match[1], 10);
  }

  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

async function fetchRepoData(repoName, fallback = {}) {
  const repoUrl = `https://api.github.com/repos/${ORG}/${repoName}`;

  try {
    // Fetch repo info
    const repo = await fetchJSON(repoUrl);

    // Fetch contributors count (first page, check Link header for total)
    let contributorsCount = fallbackNumber(fallback, "contributorsCount");
    try {
      contributorsCount = await fetchPaginatedCount(`${repoUrl}/contributors?anon=false`);
    } catch (error) {
      recordFieldWarning(repoName, "contributorsCount", error);
    }

    // GitHub repo.open_issues_count includes both Issues and Pull Requests.
    let openPRsCount = fallbackNumber(fallback, "openPRsCount");
    try {
      openPRsCount = await fetchPaginatedCount(`${repoUrl}/pulls?state=open`);
    } catch (error) {
      recordFieldWarning(repoName, "openPRsCount", error);
    }
    const openIssues = Math.max((repo.open_issues_count || 0) - openPRsCount, 0);

    // Fetch good-first-issue count
    let goodFirstIssueCount = fallbackNumber(fallback, "goodFirstIssueCount");
    try {
      const primaryCount = await fetchOpenIssueLabelCount(repoUrl, "good first issue");

      if (primaryCount > 0) {
        goodFirstIssueCount = primaryCount;
      } else {
        goodFirstIssueCount = await fetchOpenIssueLabelCount(repoUrl, "good-first-issue");
      }
    } catch (error) {
      recordFieldWarning(repoName, "goodFirstIssueCount", error);
    }

    // Fetch recent commit activity (last 4 weeks)
    let recentCommits = fallbackNumber(fallback, "recentCommits");
    try {
      const since = new Date(
        Date.now() - RECENT_COMMIT_WINDOW_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString();
      recentCommits = await fetchPaginatedCount(
        `${repoUrl}/commits?sha=${encodeURIComponent(repo.default_branch)}&since=${encodeURIComponent(since)}`,
      );
    } catch (error) {
      recordFieldWarning(repoName, "recentCommits", error);
    }

    return {
      name: repoName,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues,
      openPRsCount,
      language: repo.language,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      contributorsCount,
      goodFirstIssueCount,
      recentCommits,
      description: repo.description,
      topics: repo.topics || [],
      defaultBranch: repo.default_branch,
      license: repo.license?.spdx_id || null,
      archived: repo.archived,
      size: repo.size,
    };
  } catch (error) {
    console.error(`  Failed to fetch ${repoName}: ${error.message}`);
    return null;
  }
}

function normalizeExistingRepos(raw) {
  if (!raw || typeof raw !== "object") return {};

  let cursor = raw;
  const visited = new Set();

  while (cursor && typeof cursor === "object" && !visited.has(cursor)) {
    visited.add(cursor);
    if (cursor.repos && typeof cursor.repos === "object") {
      cursor = cursor.repos;
      continue;
    }
    break;
  }

  const normalized = {};
  for (const [key, value] of Object.entries(cursor || {})) {
    if (key === "_meta" || key === "repos") continue;
    if (!value || typeof value !== "object") continue;
    normalized[key] = value;
  }
  return normalized;
}

async function main() {
  console.log("Fetching GitHub data for OpenHW repos...");
  console.log(`Auth: ${GITHUB_TOKEN ? "Using token (5000 req/hr)" : "No token (60 req/hr)"}`);
  console.log(`Repos: ${REPOS.length}\n`);

  // Check rate limit first
  try {
    const rateRes = await fetchWithRetry("https://api.github.com/rate_limit", {
      headers,
    });
    const rate = await rateRes.json();
    console.log(
      `Rate limit: ${rate.resources.core.remaining}/${rate.resources.core.limit} remaining`,
    );
    console.log(
      `Search limit: ${rate.resources.search.remaining}/${rate.resources.search.limit} remaining\n`,
    );
  } catch {
    console.log("Could not check rate limit\n");
  }

  const results = {};
  let succeeded = 0;
  let failed = 0;

  // Load existing data before fetching so single-field API errors can retain prior values.
  let existingData = {};
  try {
    existingData = JSON.parse(readFileSync(OUTPUT_FILE, "utf-8"));
  } catch {
    // No existing data
  }

  const existingRepos = normalizeExistingRepos(existingData);

  // Process repos sequentially to respect rate limits
  for (const repo of REPOS) {
    process.stdout.write(`  Fetching ${repo}...`);
    const data = await fetchRepoData(repo, existingRepos[repo]);
    if (data) {
      results[repo] = data;
      succeeded++;
      console.log(
        ` ${data.stars} stars, ${data.forks} forks, ${data.contributorsCount} contributors`,
      );
    } else {
      failed++;
      console.log(" FAILED");
    }

    // Small delay to be respectful to the API
    await delay(200);
  }

  if (fetchWarnings.length) {
    console.warn("\nField fetch warnings; retained previous values where available:");
    for (const warning of fetchWarnings) {
      console.warn(`  - ${warning}`);
    }
  }

  // Merge: new data takes priority, existing data as fallback for failed fetches
  const merged = { ...existingRepos };
  for (const [key, value] of Object.entries(results)) {
    merged[key] = value;
  }

  const output = {
    _meta: {
      fetchedAt: new Date().toISOString(),
      source: `https://github.com/${ORG}`,
      totalRepos: REPOS.length,
      succeeded,
      failed,
      auditNote:
        "Stars, forks, open issues, open pull requests, pushedAt, contributorsCount, and recentCommits refreshed via GitHub API for homepage ranking audit.",
    },
    repos: merged,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n");
  console.log(`\nDone! ${succeeded}/${REPOS.length} repos fetched.`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
