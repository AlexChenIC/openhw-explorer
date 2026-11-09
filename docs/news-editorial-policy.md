# News Recommendation Policy

The archive and the active recommendation are independent. Historical
`highlightRank` / `editorPick` fields do not select the public recommendation.
Do not delete old news or change its dates merely to rotate a homepage card.

## Daily Editorial Pass

After the daily candidate/source review, independently review the recommendation
against the full current archive, even when no new news qualifies. Consider:

- Relevance to OpenHW, RISC-V and practical open-hardware engineering.
- Substantive technical or ecosystem impact and useful original evidence.
- Source reliability, actual publication date and time-sensitive deadlines.
- Whether another recent story offers more value; do not rotate for its own sake.

Read the primary source before selecting or materially changing a rationale.
A recommendation must refer to an existing, curated/reviewed, official/trusted
archive item with a known original publication date. It must be at most 30
calendar days old. Unknown dates, future-dated items, routine commits, generic
promotion and unverified claims are not eligible. Do not use keyword/relevance
scores or archive order as a substitute for this editorial judgment.

## Review Record

Maintain `src/data/news-editor-pick.json` independently of the news digest:

```json
{
  "version": 1,
  "reviewedOn": "YYYY-MM-DD",
  "digestUpdatedAt": "the exact current news-digest.generatedAt",
  "pick": {
    "url": "exact canonical URL of an existing archive item",
    "selectedOn": "YYYY-MM-DD",
    "expiresOn": "YYYY-MM-DD",
    "reason": { "en": "Editorial reason", "zh": "编辑选择理由" }
  }
}
```

Use actual completed review dates in Asia/Shanghai. Default a new selection to
seven days; the maximum window from selectedOn is 14 days. expiresOn is
exclusive: a record expiring November 16 is inactive from November 16 at 00:00
Asia/Shanghai. Activity/registration recommendations must expire no later than
their verified deadline. Select an earlier expiry when the material will reach
the 30-day age limit. Give a concise, source-grounded reason in both languages.

When keeping the same story, advance reviewedOn but preserve selectedOn and
expiresOn. Do not silently extend a pin. At expiry, explicitly reconsider the
recent archive; a fresh, still-eligible selection is possible only after another
source review, not by auto-renewal. The 30-day publication-age cap still applies.
If the item is removed, becomes stale, is superseded, or no longer merits the
slot, replace it or clear it. If no item qualifies, use:

```json
{
  "version": 1,
  "reviewedOn": "YYYY-MM-DD",
  "digestUpdatedAt": "the exact current news-digest.generatedAt",
  "pick": null,
  "noPickReason": { "en": "Reason for leaving the slot empty", "zh": "不推荐的具体原因" }
}
```

Do not stamp a completed review after an interrupted or failed source pass.
An existing record can expire safely while infrastructure failures are reported.

## Publication

When adding news, build the digest first, then review the recommendation against
that exact digest and run `record-news-review` with the real daily counts.
When no news is added, do not rebuild/redate the digest: update the pick review
record and daily review status only. `record-news-review` requires a matching
editor-pick review day and digest, including a deliberate no-pick decision.
Keep the recommendation record in the news-only PR allowlist. Do not commit
candidate collection data. Use the existing PR/check/merge/Pages pipeline.

Run tests, lint, data-quality validation, production build and Pages export.
The deployment status endpoint includes editorPickReviewedOn, editorPickUrl and
editorPickExpiresOn; Pages snapshot verification compares these exact values.
These are stored review metadata, not a promise that a pin remains active forever.

The browser resolves eligibility with the current Asia/Shanghai day on load,
focus/visibility return and a one-minute timer. Static HTML intentionally omits
the recommendation until a client clock is available: an old static build must
never expose an expired item as an active recommendation. Without JavaScript,
the latest-news and toolchain cards and the archive remain available.
Expired/invalid/missing records leave the editorial slot empty; there is no
fallback to historical ranks. If the chosen story is also the latest news, use
one card bearing both labels and its rationale rather than duplicate the story.
