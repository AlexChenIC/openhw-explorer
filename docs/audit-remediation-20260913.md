# Full-Site Audit Remediation

Date: 2026-09-13. Audit baseline: `fe15f954b25f6951517aabf0133d18f7ea47a3ae`.

This release implements the approved September 12 findings. It is not a new claim that every third-party assertion, license or future workflow is risk-free. The owner's instruction excludes repair of the old prototype courses: they are retired from this deployment instead.

## Finding Disposition

| ID | Why it needed attention | Change and boundary |
| --- | --- | --- |
| C01 | CORE-V names used ILEN/instruction length for register width. | Both languages now distinguish XLEN from ILEN in the grammar, three decoder examples, narration and captions; a fifth quiz question tests the distinction. Rules and quiz audio regenerated in each language. Upstream naming notation is explained, not treated as an ISA definition. |
| C02 | An old CVA6 sample generalized one configuration to the family. | Sample registration and public media retired. Its teaching content was not repaired, as requested. The future CVA6 course roadmap remains. |
| C03 | Old samples requested 28 missing caption files. | Old samples retired. Current packages now explicitly declare actual caption URLs; the player no longer invents a VTT path from every MP3. All 38 current tracks checked. |
| C04 | Foundation lesson inherited a name-decoder description. | Removed the shared, inaccurate explanatory section. |
| U01 | Language switching lost filters and left the player in the old language. | Preserves query/fragment and maps registered bilingual course IDs. Wrong-language direct player URLs redirect. A lightweight route registry keeps lesson packages out of Header's dependency graph. |
| U02 | Official/Trusted labels were too faint in light mode. | Theme-specific semantic colors. Sampled composited contrast minimum: light 6.24:1, dark 8.75:1. This is not a whole-site WCAG certification. |
| N01 | I3C HDR-DDR rate was written as 25 MHz. | Changed to raw 25 Mbps, distinguishing rate from clock and payload throughput; MIPI evidence retained alongside the internally inconsistent upstream article. |
| N02 | Digest generation permanently truncated English summaries. | Preserve complete summaries; readers can expand them. Experimental, roadmap and unconfirmed qualifiers remain. |
| N03 | Date of curation was displayed as publication date. | Separate publishedAt/addedAt/eventAt/updatedAt. 103 of 110 curated entries have source publication dates; seven remain explicitly Added/收录于. The arXiv v2 entry uses 2026-05-22. Recalculate date-dependent metrics. |
| N04 | Two repost pairs looked like separate new milestones. | Explicit event IDs merge Antmicro/CHIPS I3C host and initial Verilator four-state coverage. 110 editorial records produce 108 visible events; related sources remain accessible. Distinct releases are not grouped just because the project matches. |
| A01 | Collector swallowed failures and replaced last-good data. | Per-source status/HTTP/attempts/counts; bounded retries; XML and source-markup validation; atomic candidate writes. Total failure exits nonzero and preserves last-good; valid empty feeds differ from failed feeds. Fixtures cover these paths. |
| A02 | Daily publication relies on the local Codex task. | Added independent daily, read-only GitHub source/deployment health monitoring and a public news-status endpoint. Editing still requires the existing local task; cloud monitoring is not an automatic editor. Enable account-level Actions failure notifications. |
| I01 | Renesas MCU/MPU wording obscured CPU provenance. | Name R9A02G021's Renesas CPU separately from RZ/Five's Andes AX45MP. Do not generalize either to the whole portfolio. |
| I02 | Quintauris looked like a conventional CPU-core licensor. | Classify as design/integration enablement; label reference architectures and platforms. |
| I03 | Current Rivos/OXMIQ RISC-V product claims lacked sufficient primary support. | Removed from the default current directory pending evidence. No claim that either company ceased to exist or that a reported acquisition was completed. |
| I04 | Geography mixed offices, headquarters and service markets. | One documented-headquarters rule for all 49 current entities. 21 supported headquarters, 28 explicitly unconfirmed. No founder-nationality or parent-HQ inference. Global sales availability is a different question. |
| R01 | OpenROAD moved; old lesson references returned 404. | OpenROAD now links to openroad.org; OpenRPDK28 points to the current repository. Old sample citation repair excluded with those samples. |
| R02 | PDK openness was easily confused with tool freedom or fabrication access. | Each of eight PDKs has separate files, license, tool and fabrication notes with primary references. Retain 55 nm for ICsprout; distinguish predictive academic kits and foundry-derived experimental releases. No current MPW availability invented. |
| R03 | A Green Card archive looked like a current general reference. | Identify the 2018 edition and archived PDF; avoid suggesting it covers every current extension. |
| L01 | Old copied slide extracts lacked a closed redistribution-rights record. | Removed their public routes/media, preserving the local archive. This is exposure retirement, not a legal ruling or a newly obtained license. |
| L02 | Current course attribution/provenance was incomplete publicly. | Publish the confirmed 2025 Eclipse title, author, CC BY 4.0 attribution and adaptation scope; clarify research-only sources and synthetic narration. No unapproved private Drive URLs. Per-track correction hashes in the release manifest. |
| L03 | Navigator-data licensing scope was ambiguous. | Explicit Apache-2.0 listing for ecosystem/industry data and the new supporting navigator files. Prior grants are not narrowed; logos and upstream works retain their own terms. |
| P01 | An environment variable could enable subscription before privacy review. | Explicit disabled release gate. A future enabling PR must include privacy text and a controlled confirmation/unsubscribe/deletion test. No real email collection enabled or tested here. |
| E01 | Unnecessary English obscured Chinese summaries/tags. | Rewrote 16 recent Chinese entries and common course tags; retained product names, versions and technical qualifications. Historical archive copy is not claimed to be fully retranslated. |

## Verification

- Website: 70 tests in 11 files; lint, data-quality checks and production build pass. Build generates 116 static pages.
- Published course structure: two courses, four language packages, 38 audio/VTT pairs. Browser verification traverses every current scene, loads each audio and subtitle track, checks caption bounds, exercises decoder and quiz controls, and plays the initial audio in each package.
- Layout: 32 page/locale/theme/viewport combinations, plus eight PDK disclosure combinations. No document-level horizontal overflow or uncaught page errors in this matrix. Six locale transitions preserve the expected route/state.
- Prototype retirement: all three player URLs redirect to the hub; representative former media URLs return 404. All prototype media are excluded from this deployment, though prior public Git history/deployment copies are not erased by this change.
- Collector integration fixtures: timeout, HTTP 429/retry limit, unexpected HTTP-200 content, invalid XML, valid empty RSS/Atom, partial failure, duplicate/idempotent collection and last-good protection.
- Live collector: 81/82 source endpoints successful, 49 candidates. OCP returned HTTP 403 and is reported as degraded, not removed or claimed inactive. Test output stayed outside the publication checkout.
- Rebuilding unchanged editorial data preserves the publication timestamp.
- Education source: seven pronunciation tests; course structural QA passes with per-language narration-length settings (English maximum 650 characters; Chinese minimum 150). Character count is a heuristic, not a listening-quality measure. The default limits would reject one English explanatory clip and one concise Chinese quiz introduction; no filler was added to satisfy those limits.
- Audio analysis of 20 CORE-V names clips passes existing loudness/peak checks. Only four clips were regenerated. No claim of a complete new human listening pass or forced-aligned subtitle timing; Alex retains final listening approval.
- Public runtime updated from Next.js 16.3.1 to 16.3.5 with compatible locked dependencies. npm audit reports zero known vulnerabilities at release validation, not a security guarantee. The private education authoring application was not deployed or dependency-upgraded in this release.

## Continuing Boundaries

Unknown company headquarters remain a visible evidence backlog; they are not silently guessed. News editing still depends on the local daily task. The new cloud workflow detects failures/deployment mismatch and retains diagnostics but does not publish unchecked candidates. GitHub notification delivery depends on account settings. Newsletter collection remains disabled. Old sample files are historical source material, not a future ready-to-publish course set.

## Supporting Records

- [Industry evidence and headquarters policy](industry-review-20260913.md)
- [News operations and failure recovery](news-health-and-editorial-workflow.md)
- [Course audio/caption manifest](course-release-20260913.json)
- [Third-party attribution](third-party-attributions.md)
- [Newsletter release gate](newsletter-release-checklist.md)

Release source, checks, merge and production deployment are recorded by the associated GitHub pull request. Local detailed browser screenshots, source-date evidence and archived prototype media are retained in Alex's September 13 audit-remediation folder, not committed as public media.
