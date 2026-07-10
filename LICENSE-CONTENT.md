# License Scope: Code vs. Content

Effective date: 2026-07-10

OpenHW Explorer is an independent Alex Chen / 开源老陈 project. This repository
contains two kinds of material under different terms.

## 1. Software Code — Apache License 2.0

The website software — application code, components, build and data-pipeline
scripts, type definitions, configuration, UI translation strings, and the
project navigator data — is licensed under the Apache License, Version 2.0.
See [LICENSE](LICENSE).

This includes (non-exhaustive):

- `src/app/`, `src/components/`, `src/lib/`, `src/types/`, `src/middleware.ts`
- `scripts/`
- `src/data/projects.ts`, `src/data/filters.ts`, `src/data/resources.ts`,
  `src/data/github-stats.json`, `src/data/project-profile-meta.json`,
  `src/data/news-source-groups.json`, `src/data/news-topic-rules.json`
- `messages/`
- Build, lint, and framework configuration files

You are free to reuse and adapt the software under Apache-2.0 terms.

## 2. Course, Editorial, and Knowledge Content — Copyright Alex Chen, All Rights Reserved

The learning and editorial content is **not** covered by the Apache-2.0
license. It is Copyright © 2026 Alex Chen (开源老陈), all rights reserved,
unless a specific file states otherwise.

This includes (non-exhaustive):

- Course and classroom content: `src/data/classrooms.ts`,
  `src/data/published-classrooms.ts`, `src/data/published-classrooms/`,
  `public/classroom-assets/` (lesson text, slides, diagrams, narration,
  generated audio, avatars)
- Curated knowledge base: `src/data/knowledge/`
- News editorial content (item selection, summaries, and translations):
  `src/data/curated-news.json`, `src/data/news-digest.json`,
  `src/data/news-candidates.json`
- Documentation and editorial docs: `docs/`
- Screenshots: `screenshots/`

**What you may do:** view and use this content for personal, non-commercial
learning via the published website or this repository, and link to it or quote
brief excerpts with attribution ("Alex Chen / 开源老陈, OpenHW Explorer" plus a
link).

**What requires prior written permission:** republishing, redistribution,
translation, adaptation, commercial use, use in paid or institutional training,
and bulk or automated reproduction (including for machine-learning training
datasets).

## 3. Brand Assets — All Rights Reserved

Logos, marks, wordmarks, mascot artwork files, and brand identity materials are
Copyright © 2026 Alex Chen, all rights reserved. They may not be reused,
modified, or redistributed without prior written permission:

- `public/brand/`, `public/apple-icon.svg`
- `docs/openhw-explorer-brand-system.md`,
  `docs/openhw-explorer-logo-candidates.md`

The names "OpenHW Explorer" and "开源老陈" identify this independent project.
This project is not an official OpenHW Foundation site; "OpenHW" refers to the
OpenHW Foundation ecosystem, whose marks belong to their respective owners.

## 4. Third-Party Material

Facts are not subject to copyright. Upstream project descriptions, statistics
from the GitHub API, and referenced papers, talks, articles, and images remain
the property of their respective owners. See
[docs/third-party-attributions.md](docs/third-party-attributions.md).

## Contact

For content licensing requests, contact Alex Chen via GitHub
([@AlexChenIC](https://github.com/AlexChenIC)).
