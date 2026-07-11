# OpenHW Explorer 1.0 Preflight Checklist

Updated: 2026-07-11

This file is a release gate for the first public 1.0 launch of OpenHW Explorer.
Before promoting the site as a formal 1.0 release, review this checklist with
Alex Chen and decide the final brand, licensing, and publishing posture.

## Why This Gate Exists

OpenHW Explorer is moving from a personal prototype into a public learning and
navigation product. The repository is currently licensed under Apache-2.0, but
that should not automatically imply that every website asset, course, slide,
voice file, logo, or future paid product is released under the same terms.

The 1.0 release must keep the open-source spirit while preserving room for:

- public free learning resources
- future premium courses or services
- Alex Chen / 开源老陈 personal brand assets
- clear third-party attribution and source boundaries

## Required Before Public 1.0

- [ ] Decide the public brand name used for 1.0.
  - Candidate names include `OpenHW Explorer`, `OHX`, `开源老陈`, and
    `Alex Chen OpenHW Lab`.
  - Avoid positioning the project as an official OpenHW Foundation site.

- [ ] Choose and bind a professional domain.
  - Keep Vercel as the deployment target if convenient.
  - Prefer a memorable domain that can support both the Explorer website and
    future learning products.

- [x] Clarify the license scope. (Done 2026-07-10)
  - Apache-2.0 applies to software and specifically identified navigator data.
  - New original human-authored or human-edited learning, editorial, and brand
    content may be rights reserved where copyright or related rights subsist.
  - The policy does not claim ownership of third-party works, unprotectable
    facts, or purely machine-generated material where copyright does not
    subsist.
  - Scope documented in `LICENSE-CONTENT.md`, referenced from `README.md`,
    `NOTICE`, and `CONTRIBUTING.md`, with copyright headers in
    `src/data/classrooms.ts`, `src/data/published-classrooms.ts`, and
    `src/data/knowledge/index.ts`.

- [x] Decide the course content license. (Done 2026-07-10)
  - Future public courses will be human-reviewed before publication. New
    original scripts, slides, narration, and annotations are rights reserved
    where applicable; third-party and non-protectable AI-generated material is
    excluded from the ownership claim.
  - Note: content published before 2026-07-10 was distributed under
    Apache-2.0 in git history; that grant is irrevocable for those versions.
    For later changes, only new protectable expression can be reserved; the
    pre-existing Apache-2.0 portions remain under their original license.

- [ ] Review trademark strategy.
  - Search likely conflicts for the selected name and logo.
  - Consider protecting `OHX`, the chip-mark logo, `开源老陈`, or a more
    distinctive Alex Chen brand mark.
  - Treat `OpenHW` carefully because it refers to the OpenHW Foundation
    ecosystem.

- [ ] Review third-party attribution.
  - Check `docs/third-party-attributions.md`.
  - Confirm that external resource directories, project descriptions, images,
    diagrams, and course source slices have proper source links and license
    notes.

- [x] Add a concise public legal/attribution statement. (Done 2026-07-11)
  - The site should state that it is an independent learning/navigation project.
  - Keep the statement professional and unobtrusive.
  - Added bilingual `/license` pages and an unobtrusive footer link.
  - The About page retains the independent-project and privacy statements.

- [x] Decide whether the 1.0 release is fully open source, open-core, or
      open-source code plus reserved content. (Done 2026-07-11)
  - Adopted posture: Apache-2.0 software and navigator data, a public learning
    hub, reserved original course/editorial/brand content where applicable, and
    optional premium content later.

## Suggested 1.0 Release Wording

Use wording close to this unless the strategy changes:

> OpenHW Explorer is an independent Alex Chen / 开源老陈 project that helps
> developers explore OpenHW and open-source RISC-V resources. The software
> source code is released under Apache-2.0. Course content, narration, generated
> audio, visual assets, logos, and brand materials are copyright Alex Chen
> unless separately stated.

## Reminder For Future AI / Codex Threads

If Alex Chen asks to prepare, tag, announce, or publish OpenHW Explorer 1.0,
stop and review this file first. Do not treat 1.0 as ready until the brand,
domain, license scope, attribution, and course content policy above have been
explicitly checked.
