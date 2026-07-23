# OpenHW Explorer

A bilingual, source-backed navigator for 40 OpenHW repositories, technical
resources, ecosystem news, and future human-reviewed learning material.

---

## Run Locally

**Requirements:** Node.js 20.9+

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/[locale]/          # Page routes (en / zh bilingual)
├── components/
│   ├── QuickFilters.tsx   # Filter system UI
│   └── ProjectCard.tsx    # Project card
├── data/
│   ├── projects.ts        # 40 project entries + filter logic (core file)
│   ├── filters.ts         # Filter option configuration
│   ├── knowledge/         # Curated knowledge base (papers, industry cases, talks)
│   └── github-stats.json  # Cached GitHub stats
└── types/index.ts         # All type definitions
messages/
├── en.json                # English translations
└── zh.json                # Chinese translations
```

---

## Tech Stack

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| Next.js 16     | Framework, App Router, static generation |
| TypeScript 5   | Type safety                              |
| Tailwind CSS 4 | Styling                                  |
| next-intl      | EN/ZH bilingual support                  |
| Fuse.js        | Client-side fuzzy search                 |

---

## Reuse Guide

### Filter System

All configuration is in `src/data/filters.ts`, covering roles (5), categories (6), core types, and verification types.
Filter logic lives in `filterProjects()` in `src/data/projects.ts` — supports multi-condition stacking and URL state sync.

### Data Structure

Type definitions are in `src/types/index.ts`. To add a project, append an entry conforming to the `Project` interface in the `projects` array in `src/data/projects.ts`.

---

## Release Notes

Before promoting OpenHW Explorer as a formal public 1.0 release, review
`docs/release-1.0-preflight.md`. That checklist records the required decisions
around brand naming, trademark posture, copyright/license scope, professional
domain setup, third-party attribution, and future paid-course flexibility.

---

## License

- **Software and identified navigator data** - [Apache License 2.0](LICENSE).
- **Original human-authored or human-edited learning, editorial, and brand
  content** - rights reserved where applicable.
- **Third-party material and historical versions** - governed by their own
  terms and the boundaries documented below.

See [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for the exact scope of each.

OpenHW Explorer is an independent project and is not an official OpenHW
Foundation site.
