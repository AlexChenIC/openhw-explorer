# CVA6 overview release — 2026-10-18

The bilingual CVA6 overview replaces the previous demo at its stable `cva6-project-intro-en` and `cva6-project-intro-zh` IDs. The lesson route remains `/[locale]/classroom/project-guides/cva6-introduction`.

The release has 13 scenes, 12 image pages, two native embedded activities and four native comprehension questions with per-option feedback. Scene IDs retain s01–s10, s12–s14; the old s11 PR case-study page was deliberately omitted. Narration is 15.4 minutes in Chinese and 21.1 minutes in English, excluding learner activity time. English exceeds the original approximate duration target; measured duration is displayed honestly.

Alex approved publication on October 18 after positive overall feedback. `publication-authorization.json` records the exact instruction. Separate detailed technical, visual, quiz, full-audio and caption-timing sign-offs were not attested, and are not invented. Locale production records below preserve the October 15 automated QA and historical review status; the October 18 authorization governs this publication.

English narration uses local Qwen3-TTS MLX/Aiden; Chinese uses local CosyVoice3 with the existing synthetic lecturer reference. Each scene has an independent MP3 and VTT. Caption timings are estimated by sentence/semantic chunk from final audio duration, rather than forced alignment. Model, voice, post-processing and source provenance are retained in the locale records.

Slides are community teaching interpretations authored by Alex Chen, based on linked primary sources with explicit configuration and version boundaries. They are not official OpenHW certification. User-returned generated artwork, the repaired architecture pages and the s14 display-only footer crop retain their recorded provenance; no new third-party logos, original deck artwork or private sources were introduced for this release.

## Reproduction and integrity

The education checkout's `scripts/export-cva6-overview-release.mjs` preflights both language packages and all image, narration and caption digests before exporting either locale. `release-manifest.json` binds both public JSON packages and all 76 versioned media files. The public specialization reuses the reviewed local course layout and has no operator services, credentials, local endpoints or drafting controls.

## Rollback

The prior package JSON is recoverable from the parent main commit. Previous public media remains untouched. Revert the single public-site release commit through Git, run the normal checks and merge to main; the existing Vercel integration and Cloudflare Pages CI then redeploy the previous course. Do not overwrite the mirrors from an old local checkout. Canonical `.com`, primary Pages-to-`.com` redirects and the existing mirror policies are unchanged.

## Verification

Run `npm run lint`, `npm run check:data-quality`, `npm test`, `npm run build` and `npm run build:pages`. `node scripts/verify-cva6-overview.mjs --base <host> --expected-commit <main-sha>` verifies bilingual pages, every versioned media digest/MIME and the deployment commit. Browser verification covers desktop/mobile, audio/captions, image zoom, both activities, quiz grading/retry, language switching and console errors. Deployment receipts are retained in the local release report, outside published course content.
