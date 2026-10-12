# News Operations

## Separate stages

1. **Collection:** the weekly candidate workflow opens a PR; candidates are not live news. Source results, HTTP codes, retries and parsed counts are saved in an Actions artifact.
2. **Editing:** the existing daily local Codex task verifies and selects news. It requires this Mac, network access and working credentials. A sleeping/offline Mac cannot run it reliably.
3. **Publication:** edit curated-news.json, run build-news, test, merge and verify Vercel.
4. **Independent cloud check:** Daily news health runs at 08:47 UTC, reads sources and compares production's /api/news-status with main. It has no write permission and never publishes its candidate output.

All-source failure preserves the last good candidate file and exits nonzero. Partial failure is explicitly degraded. A valid empty feed is not a broken feed. No editorial change leaves generatedAt unchanged.

## Completed review record

The page distinguishes the latest included source publication date, the digest content update date, and the most recent completed editorial check. A check with no selected items is recorded without rebuilding or redating the digest:

```bash
npm run record-news-review -- --checked-on 2026-10-06 --outcome no_new_items --candidate-count 52 --added-count 0
```

Use the actual completed review date in Asia/Shanghai and actual candidate/added counts. For a review that adds items, run build-news first, then record with outcome `published` and the number added. Never record a completed check for an aborted review or an all-source collection failure. Partial source coverage must be disclosed in the PR; “no new items selected” does not assert that no news exists.

The command writes only src/data/news-review-status.json, bound to digest.generatedAt. A later digest invalidates the previous outcome until another review is recorded. The API exposes lastCheckedOn, lastCheckOutcome and lastCheckAddedCount alongside its existing fields. The initial October 6 record reflects the completed daily editorial pass: 52 candidates, zero new items selected.

The daily task opens a status-only PR on no-selection days and includes the status with curated-news.json/news-digest.json on publication days. Both follow the same validation, preview, merge and production verification requirements. Candidate collection and read-only health checks must never advance the editorial review date.

## Date and event policy

- publishedAt is the source publication date, not the date an editor found a link.
- addedAt records curation. Missing source dates remain missing and display as Added/收录于.
- Use eventAt for an activity's date; do not overwrite the reporting date with it.
- eventId associates confirmed coverage of the same event. Mark the original as eventRole: primary; reposts become relatedSources in the public digest.
- Keep complete bilingual summaries, including planned, experimental and unconfirmed qualifiers.

## Alerts and recovery

Enable GitHub Actions failed-workflow notifications for this repository in GitHub notification settings. Workflow failure is the alert mechanism; this code does not guarantee email delivery when account notifications are muted.

On failure, inspect the artifact and run log. Check source parsing versus rate limits, then the local curation run, merged commit and Vercel deployment. Run Daily news health manually after recovery. Over seven days without an editorial change is a review warning, not proof of an outage and never a reason to create filler news or fake a date.

The cloud checker is a fallback monitor, not a cloud replacement for the editorial task. LinkedIn posts remain discovery leads; publish facts only after inspecting the post or a supporting public primary source.
