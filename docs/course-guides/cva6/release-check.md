# CVA6 project guide v2: release check

Date: 2026-10-02. Status: **Demo / review-ready**. This revision replaces the 2026-09-13 nine-scene guide.

## Checked

- Configuration source pinned to CVA6 `81245a47fad8fe1a5d562d953ef2662e099def76`; effective issue and commit widths traced through `build_config`.
- CV32A60X TRL5 evidence separately pinned to `cv32a60x-v6.0.0` / `b1f80bd7cff3a94e5191aad96dc3a22f87d0a517`, with its configuration restrictions stated.
- Twelve aligned scenes, two interactive activities, four questions and twelve narration/caption pairs per language.
- Public primary-source ledger and original teaching visuals; no private source files or access-controlled links distributed.
- 57 education tests and 79 site tests pass. Site lint, data-quality checks, TypeScript and production build pass.
- Both language editions checked at desktop and mobile widths; configuration and evidence interactions, quiz feedback, source display and locale switching exercised.
- All 48 media assets served correctly and matched exported hashes. English and Mandarin production-build audio playback verified locally.
- Demo routes remain excluded from the sitemap and marked `noindex`.

See [PRODUCTION-AUDIT.md](./PRODUCTION-AUDIT.md) for exact checks and limits, [audio-manifest.json](./audio-manifest.json) for final media digests, and [TTS-PROVENANCE.md](./TTS-PROVENANCE.md) for synthesis provenance.

## Remaining approval

Human technical/editorial review, full listening and subtitle readability/timing acceptance are pending; see [review-checklist.md](./review-checklist.md). ASR and signal measurements support this review but do not replace it. Caption timing is duration-weighted, not word-level forced alignment. No CPU simulation, performance measurement, qualification or upstream test execution is claimed. The public production site has not been updated by this task.
