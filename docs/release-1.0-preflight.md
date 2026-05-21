# OpenHW Explorer 1.0 Preflight Checklist

Updated: 2026-05-21

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

- [ ] Clarify the license scope.
  - Confirm whether Apache-2.0 applies only to the software code.
  - Explicitly exclude, if desired, course content, slide decks, narration,
    generated audio, logo files, brand assets, and paid materials.
  - Add the final scope to `README.md`, `NOTICE`, or a dedicated license-scope
    document before 1.0.

- [ ] Decide the course content license.
  - Do not use a broad open license for courses until the long-term business
    model is clear.
  - Recommended default for 1.0: public viewing is allowed, but course text,
    slides, audio, and downloadable assets remain copyright Alex Chen unless
    separately stated.

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

- [ ] Add a concise public legal/attribution statement.
  - The site should state that it is an independent learning/navigation project.
  - Keep the statement professional and unobtrusive.
  - Do not place "not official" warnings inside the main logo or persistent
    brand lockup.

- [ ] Decide whether the 1.0 release is fully open source, open-core, or
  open-source code plus reserved content.
  - Recommended current posture: open-source code, public free learning hub,
    reserved brand/course assets, optional premium content later.

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
