#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GITHUB_STATS_FILE = join(ROOT, "src/data/github-stats.json");
const NEWS_DIGEST_FILE = join(ROOT, "src/data/news-digest.json");
const PROJECTS_FILE = join(ROOT, "src/data/projects.ts");
const PROJECT_PROFILE_META_FILE = join(ROOT, "src/data/project-profile-meta.json");
const REPO_DOCS_DIR = join(ROOT, "docs/repos");
const DAYS_TO_INCLUDE = 7;
const NEWS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_NEWS === "true";

function readJson(filePath) {
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonNegativeNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function toDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function extractProjectIds() {
  const content = readFileSync(PROJECTS_FILE, "utf-8");
  const startMarker = "export const projects: Project[] = [";
  const start = content.indexOf(startMarker);
  const end = content.indexOf("\n];", start);
  const section = start >= 0 && end > start ? content.slice(start, end) : content;
  const ids = [...section.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

function validateGithubStats() {
  const errors = [];
  const data = readJson(GITHUB_STATS_FILE);

  if (!isPlainObject(data)) {
    errors.push("github-stats root must be an object");
    return errors;
  }

  if (!isPlainObject(data._meta)) {
    errors.push("github-stats._meta must be an object");
  }

  if (!isPlainObject(data.repos)) {
    errors.push("github-stats.repos must be an object");
    return errors;
  }

  if ("repos" in data.repos) {
    errors.push("github-stats.repos contains nested 'repos' key (corrupted shape)");
  }

  const repoEntries = Object.entries(data.repos).filter(([key]) => key !== "_meta");
  if (repoEntries.length === 0) {
    errors.push("github-stats.repos has no repository entries");
  }

  for (const [name, repo] of repoEntries) {
    if (!isPlainObject(repo)) {
      errors.push(`repo '${name}' must be an object`);
      continue;
    }
    if (!repo.name || typeof repo.name !== "string") {
      errors.push(`repo '${name}' missing string field 'name'`);
    }
    if (!isNonNegativeNumber(repo.stars)) {
      errors.push(`repo '${name}' has invalid non-negative number field 'stars'`);
    }
    if (!isNonNegativeNumber(repo.forks)) {
      errors.push(`repo '${name}' has invalid non-negative number field 'forks'`);
    }
    if (!isNonNegativeNumber(repo.openIssues)) {
      errors.push(`repo '${name}' has invalid non-negative number field 'openIssues'`);
    }
  }

  return errors;
}

function validateNewsDigest() {
  const errors = [];
  const warnings = [];
  const now = Date.now();
  const maxAgeMs = DAYS_TO_INCLUDE * 24 * 60 * 60 * 1000;
  const data = readJson(NEWS_DIGEST_FILE);

  if (!isPlainObject(data)) {
    errors.push("news-digest root must be an object");
    return { errors, warnings };
  }

  if (!Array.isArray(data.items)) {
    errors.push("news-digest.items must be an array");
    return { errors, warnings };
  }

  data.items.forEach((item, index) => {
    if (!isPlainObject(item)) {
      errors.push(`news item[${index}] must be an object`);
      return;
    }

    const reviewStatus = item.reviewStatus;
    const isCurated = reviewStatus === "curated";
    const publishedAt = toDate(item.publishedAt);

    if (!isCurated) {
      if (!publishedAt) {
        errors.push(`news item[${index}] has invalid publishedAt`);
        return;
      }
      const ageMs = now - publishedAt.getTime();
      if (ageMs < 0) {
        warnings.push(`news item[${index}] publishedAt is in the future`);
      } else if (ageMs > maxAgeMs) {
        errors.push(`news item[${index}] is older than ${DAYS_TO_INCLUDE} days`);
      }
    }

    if (
      item.sourceTier !== undefined &&
      item.sourceTier !== "official" &&
      item.sourceTier !== "trusted" &&
      item.sourceTier !== "community"
    ) {
      errors.push(`news item[${index}] has invalid sourceTier '${item.sourceTier}'`);
    }
  });

  return { errors, warnings };
}

function validateProjectProfileMeta() {
  const errors = [];
  const warnings = [];
  const projectIds = extractProjectIds();
  const data = readJson(PROJECT_PROFILE_META_FILE);

  if (!isPlainObject(data)) {
    errors.push("project-profile-meta root must be an object");
    return { errors, warnings };
  }

  if (!isPlainObject(data._meta)) {
    errors.push("project-profile-meta._meta must be an object");
  }

  if (!isPlainObject(data.profiles)) {
    errors.push("project-profile-meta.profiles must be an object");
    return { errors, warnings };
  }

  for (const id of projectIds) {
    const profile = data.profiles[id];
    if (!isPlainObject(profile)) {
      errors.push(`missing project-profile-meta for '${id}'`);
      continue;
    }

    if (
      profile.reviewStatus !== "reviewed" &&
      profile.reviewStatus !== "auto" &&
      profile.reviewStatus !== "needs-review"
    ) {
      errors.push(`project '${id}' has invalid reviewStatus '${profile.reviewStatus}'`);
    }

    if (
      profile.sourceTier !== "official" &&
      profile.sourceTier !== "trusted" &&
      profile.sourceTier !== "community"
    ) {
      errors.push(`project '${id}' has invalid sourceTier '${profile.sourceTier}'`);
    }

    if (!Array.isArray(profile.sourceUrls)) {
      errors.push(`project '${id}' sourceUrls must be an array`);
    } else if (profile.sourceUrls.length === 0) {
      warnings.push(`project '${id}' has no sourceUrls`);
    }

    if (profile.reviewStatus === "reviewed") {
      if (!profile.verifiedAt || !toDate(profile.verifiedAt)) {
        errors.push(`project '${id}' is reviewed but verifiedAt is missing/invalid`);
      }
    }

    if (
      typeof profile.confidence !== "number" ||
      profile.confidence < 0 ||
      profile.confidence > 1
    ) {
      errors.push(`project '${id}' has invalid confidence '${profile.confidence}'`);
    }

    const docPath = join(REPO_DOCS_DIR, id, "profile.md");
    if (!existsSync(docPath)) {
      errors.push(`project '${id}' missing docs profile file`);
      continue;
    }

    const doc = readFileSync(docPath, "utf-8");
    if (/TODO: 从模板/.test(doc)) {
      errors.push(`project '${id}' profile.md still contains TODO placeholder`);
    }
  }

  return { errors, warnings };
}

function main() {
  let hasErrors = false;

  try {
    const githubErrors = validateGithubStats();
    if (githubErrors.length) {
      hasErrors = true;
      console.error("[github-stats] validation failed:");
      for (const error of githubErrors) {
        console.error(`  - ${error}`);
      }
    } else {
      console.log("[github-stats] validation passed");
    }

    if (NEWS_ENABLED) {
      const { errors: newsErrors, warnings: newsWarnings } = validateNewsDigest();
      if (newsWarnings.length) {
        console.warn("[news-digest] warnings:");
        for (const warning of newsWarnings) {
          console.warn(`  - ${warning}`);
        }
      }
      if (newsErrors.length) {
        hasErrors = true;
        console.error("[news-digest] validation failed:");
        for (const error of newsErrors) {
          console.error(`  - ${error}`);
        }
      } else {
        console.log("[news-digest] validation passed");
      }
    } else {
      console.log("[news-digest] validation skipped (NEXT_PUBLIC_ENABLE_NEWS is not true)");
    }

    const { errors: profileErrors, warnings: profileWarnings } = validateProjectProfileMeta();
    if (profileWarnings.length) {
      console.warn("[project-profile-meta] warnings:");
      for (const warning of profileWarnings) {
        console.warn(`  - ${warning}`);
      }
    }
    if (profileErrors.length) {
      hasErrors = true;
      console.error("[project-profile-meta] validation failed:");
      for (const error of profileErrors) {
        console.error(`  - ${error}`);
      }
    } else {
      console.log("[project-profile-meta] validation passed");
    }
  } catch (error) {
    hasErrors = true;
    console.error(`Validation script failed: ${error.message}`);
  }

  if (hasErrors) {
    process.exit(1);
  }
}

main();
