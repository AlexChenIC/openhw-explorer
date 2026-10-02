# Summit Public Preview checklist

This checklist records the 2026-10-01 implementation for the first public
demonstration. Automated checks do not replace editorial, audio or rights review.

## Implemented scope

- The public catalog, series/lesson routes, focused players and sitemap share
  `src/data/classroom-publication.ts`. Foundation comes first, then CORE-V names,
  then CVA6. Both languages remain available. CVA6 remains a Demo and noindex.
- Planned lessons, the longer CVA6 roadmap, Library and newsletter promises are
  absent from the preview. One non-clickable future lesson card remains. Original
  catalog data is preserved.
- Industry navigation, counts, route content, metadata and sitemap entries are
  withdrawn. Its company data and assets are preserved.
- Withdrawn routes return a temporary HTTP 307 to the same-language Learning
  Hub or Resources page, before Next.js can begin a streamed response.
- CVA6 Tier CI links point to `https://openhwfoundation.github.io/cva6/`.
- Player controls wrap at narrow widths and retain 44px minimum height.
- Footer, About, Licensing and metadata state the project's independent identity.
  About identifies Junchao Chen (Alex Chen) as creator and maintainer, with GitHub
  and LinkedIn links. A more specific job title needs the maintainer's confirmation.
- Feedback text links and two issue templates supplement the existing floating
  feedback button. No test issue was submitted. Templates become available on
  GitHub after this change reaches the default branch.
- Full installed production dependency notices, embedded notices, Inter OFL,
  Feather MIT and versioned Analytics MPL source links are served through
  `/third-party-notices.txt`. This inventory includes server/build dependencies;
  it does not certify trademark or teaching-material permission.
- Next.js and its ESLint configuration use 16.3.6. Compatible brace-expansion
  patches remove the remaining development dependency advisory.

## Automated and browser validation

2026-10-01 repair validation passed: 79 tests across 13 files, lint, data-quality,
Next.js 16.3.6 production build (122 generated pages), and full `npm audit`
(zero reported vulnerabilities). A local production-server smoke check passed
41 route/status/notice checks, including both-language withdrawals and localized
player redirects. The browser checks below passed on the local production build;
audio was sampled only, and real-device/network acceptance remains open.

Run before merging:

```sh
npm ci
npm run build:third-party-notices
npm run lint
npm test
npm run check:data-quality
GITHUB_TOKEN= npm run build
npm audit
npm run start -- --port 3100
```

The empty token keeps the build on the checked-in GitHub stats cache. Do not
advance news dates or refresh unrelated data as a side effect of this repair.

Browser acceptance:

- EN/中文 Learning Hub shows exactly the three selected learning experiences;
  Foundation precedes names; future card contains no interactive element.
- Resources shows Technical Library and Ecosystem Directory without Industry.
- At 320px, all three player controls stay within the clipping container on all
  six focused players and both embedded CVA6 guides, without horizontal overflow.
- Next/Prev, a quiz submission, a CVA6 configuration interaction, source links,
  fullscreen entry/exit and a short audio playback sample work.
- Footer disclosure/feedback, About identity, license notice link, mobile menu
  and language switching remain usable.
- Withdrawn series, planned lessons, retired players and Industry URLs return
  307 in both languages. Public routes and the notice file return 200. Sitemap
  excludes Industry, withdrawn courses and the CVA6 Demo lesson.

## Human gates still open

- [ ] Confirm the use of the OpenHW product name and Foundation/CORE-V marks
      for this independent project, including appropriate permission or usage terms.
- [ ] Record the exact license and attribution for the original Foundation
      teaching deck and any retained third-party slide images.
- [ ] Complete technical/editorial review and full listening of the EN/中文
      versions of all three experiences. Retain CVA6's Demo label until approved.
- [ ] Test the actual QR entry on real iOS and Android phones on the intended
      mainland event network, including audio and GitHub feedback reachability.

Remaining optional improvements include a few narration/translation corrections
with synchronized audio/VTT, larger Header tap areas, shorter mobile lesson
prefaces and broader upstream repository URL migration. These are not bundled
with this minimum preview repair.

## Recovery and deployment

The flags in README are build-time controls; changing an environment value alone
does not alter an existing deployment. To withdraw courses, set
`NEXT_PUBLIC_ENABLE_CLASSROOM_COURSES=false`, rebuild and redeploy. To restore
Industry explicitly, set `NEXT_PUBLIC_ENABLE_INDUSTRY_LANDSCAPE=true` and repeat
route/sitemap/browser checks. To restore the broader catalog presentation, set
`NEXT_PUBLIC_ENABLE_PUBLIC_PREVIEW=false`; planned lessons still do not acquire
published status.

Keep the change as a reviewable PR until the applicable human gates are resolved.
Merging into `main` triggers the existing Vercel production deployment. After
deployment, verify the deployed commit and both language routes on the public URL.
