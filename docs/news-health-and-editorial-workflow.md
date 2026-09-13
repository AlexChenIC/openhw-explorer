# News Operations

## Separate stages

1. **Collection:** the weekly candidate workflow opens a PR; candidates are not live news. Source results, HTTP codes, retries and parsed counts are saved in an Actions artifact.
2. **Editing:** the existing daily local Codex task verifies and selects news. It requires this Mac, network access and working credentials. A sleeping/offline Mac cannot run it reliably.
3. **Publication:** edit curated-news.json, run build-news, test, merge and verify Vercel.
4. **Independent cloud check:** Daily news health runs at 08:47 UTC, reads sources and compares production's /api/news-status with main. It has no write permission and never publishes its candidate output.

All-source failure preserves the last good candidate file and exits nonzero. Partial failure is explicitly degraded. A valid empty feed is not a broken feed. No editorial change leaves generatedAt unchanged.

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
