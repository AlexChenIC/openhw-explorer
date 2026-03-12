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

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
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

async function fetchSearchIssueCount(query) {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=1`;
  const result = await fetchJSON(url);
  return result.total_count || 0;
}

async function fetchRepoData(repoName) {
  const repoUrl = `https://api.github.com/repos/${ORG}/${repoName}`;

  try {
    // Fetch repo info
    const repo = await fetchJSON(repoUrl);

    // Fetch contributors count (first page, check Link header for total)
    let contributorsCount = 0;
    try {
      const contribRes = await fetch(`${repoUrl}/contributors?per_page=1&anon=false`, { headers });
      if (contribRes.ok) {
        const linkHeader = contribRes.headers.get("link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          contributorsCount = match ? parseInt(match[1]) : 1;
        } else {
          const data = await contribRes.json();
          contributorsCount = Array.isArray(data) ? data.length : 0;
        }
      }
    } catch {
      // Ignore contributor count errors
    }

    // Fetch good-first-issue count
    let goodFirstIssueCount = 0;
    try {
      const primaryCount = await fetchSearchIssueCount(
        `repo:${ORG}/${repoName} label:"good first issue" is:issue is:open`,
      );

      if (primaryCount > 0) {
        goodFirstIssueCount = primaryCount;
      } else {
        goodFirstIssueCount = await fetchSearchIssueCount(
          `repo:${ORG}/${repoName} label:"good-first-issue" is:issue is:open`,
        );
      }
    } catch {
      // Ignore search errors
    }

    // Fetch recent commit activity (last 4 weeks)
    let recentCommits = 0;
    try {
      const participation = await fetchJSON(`${repoUrl}/stats/participation`);
      if (participation.all) {
        // Last 4 weeks of commits
        recentCommits = participation.all.slice(-4).reduce((a, b) => a + b, 0);
      }
    } catch {
      // Ignore participation errors
    }

    return {
      name: repoName,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
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
    const rateRes = await fetch("https://api.github.com/rate_limit", {
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

  // Process repos sequentially to respect rate limits
  for (const repo of REPOS) {
    process.stdout.write(`  Fetching ${repo}...`);
    const data = await fetchRepoData(repo);
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
    await new Promise((r) => setTimeout(r, 200));
  }

  // Load existing data to preserve it as fallback
  let existingData = {};
  try {
    existingData = JSON.parse(readFileSync(OUTPUT_FILE, "utf-8"));
  } catch {
    // No existing data
  }

  const existingRepos = normalizeExistingRepos(existingData);

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
