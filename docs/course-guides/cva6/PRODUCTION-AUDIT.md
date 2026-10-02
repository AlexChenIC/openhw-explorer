# CVA6 guide v2 production audit — 2026-10-02

Status: **complete local/draft package for review; Demo**. Human technical approval and full-course listening are pending. No CPU simulation, synthesis, FPGA test, architectural certification or silicon qualification was performed by this course-production task.

## Content and evidence

- 12 aligned scenes per language; 2 interactive activities; 4 assessed decisions.
- Configuration/code snapshot: 81245a47fad8fe1a5d562d953ef2662e099def76. TRL5 release: cv32a60x-v6.0.0 / b1f80bd7cff3a94e5191aad96dc3a22f87d0a517.
- Derived parameters were checked in build_config; CV32A65X effective commit width is 2 despite its raw package field being 1.
- Primary-source ledger and claim boundaries cover ThreadX, verification/ACT4, scoped TRL5, Bosch/TRISTAN, ASTRAL, Basilisk and Occamy. Conference-talk workflow and private sources were excluded.
- Narration explains relationships and worked decisions; dates are evidence context, not recall-test questions.
- Original text and HTML visuals only; see RIGHTS-AND-ATTRIBUTIONS.md.

## Media verification

All 24 final clips have ASR records tied to final audio SHA-256 values. No sentence-scale omission or looping repetition was found in the reviewed ASR output. English processor-name flags in the systems and next-step clips prompted targeted rerenders. Remaining acronym, numeral and homophone differences need the pending human listening pass; ASR is not a pronunciation sign-off.

| Edition | Total narration | Clip range | Mean volume range | Highest measured peak |
|---|---:|---:|---:|---:|
| en | 10.24 min | 41.8–60.4 s | -18.6–-17.4 dB | -1.9 dB |
| zh | 9.27 min | 40.0–51.7 s | -18.4–-17.5 dB | -1.7 dB |

All clips pass the repository audio QA. All 24 caption tracks match final narration text and audio duration; stale assets were removed. Cue timing is duration-weighted, not word-level forced alignment. Digests and clip-level measurements are in audio-manifest.json.

The existing package checker defaults to 520 characters. For this evidence lesson, English uses its supported `--max-speech-chars 800` option: the actual scripts are 597–766 characters and the rendered clips are approximately one minute or less. Mandarin retains the default limit. This is a measured course-specific allowance, not a global validator change. Dense identifiers account for slower pacing in selected scenes.

## Browser and code checks

- Both languages reviewed at 1440 × 1000 and 320 × 900; all 24 scene layouts inspected. No horizontal overflow in the 24 narrow-viewport measurements.
- All three configurations exercised in each language. Effective issue/commit widths: 1/1, 2/2, 1/2. Narrow iframe content fits its width; configuration controls are at least 44 px tall.
- Both answers on all four evidence cards exercised in each language; selection state, feedback and progress count work.
- Four quiz choices and explanations exercised in each language; answer order B/C/A/D matches.
- Source drawer opens pinned public references; locale switching selects the matching course ID.
- Education tests: 57 passing across 14 OpenHW test files; affected files lint clean. One pre-existing catalog test assumed the flagship was first; changed it to find the same stable ID, preserving the publication assertion and leaving catalog order untouched.
- Export rejects a missing bilingual caption package or stale caption text before writing either locale; negative tests cover both failures, and a successful bilingual export test covers transcripts and package writes.

- Main-site tests: 79 passing across 13 files. Full repository lint and data-quality checks pass. The production build completes with TypeScript validation and 122 static pages.
- 52 HTTP checks pass: both language hub/player routes and all 48 audio/caption assets return 200. Served media SHA-256 values match the exported files. A byte-range audio request returns 206 with the requested 64 bytes.
- Both production-build players were exercised on localhost:3100. Actual English and Mandarin audio playback advanced beyond 26 seconds with no media error, and pause worked. Production locale switching selected the matching course.
- No production-player console warning/error was observed. Development locale navigation exposed an existing ThemeScript warning on localhost:3101; this reconstruction does not change theme code.
- These are local production-build checks, not a verification of the deployed public site.

## Reproduction

1. `node --experimental-strip-types scripts/seed-cva6-project-intro.mjs`
2. Use `pnpm openhw:tts` with the established voice/language/speed and `--polish-audio`. Preserve clips only when the script and synthesis inputs are unchanged.
3. `pnpm openhw:subtitles -- --classroom-id <id>`
4. `pnpm openhw:qa-audio -- --classroom-id <id>` and `pnpm openhw:qa -- --classroom-id <id> --require-audio` (English adds `--max-speech-chars 800`).
5. Review ASR and digests, then `node scripts/export-cva6-project-intro.mjs --site <review-checkout>`.
6. Run site tests/build and browser review. Human listening and editorial acceptance remain required before promotion from Demo.
