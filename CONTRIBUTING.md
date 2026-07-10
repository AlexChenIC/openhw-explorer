# Contributing to OpenHW Explorer

Thank you for your interest in contributing. This is a community-maintained project and all contributions are welcome.

## Ways to Contribute

### Add or Update Project Data

The primary way to contribute is by improving the project catalog:

1. Edit `src/data/projects.ts` to add a new project or update an existing one
2. Edit `src/data/knowledge/index.ts` to add knowledge base entries (papers, talks, industry use)
3. Run `npm run check:data-quality` to validate your changes
4. Submit a pull request with a short description of what you added or fixed

### Report Issues

If you spot incorrect data, a broken link, or a missing project, open a GitHub issue. Include the project name and what needs to be corrected.

### Code Contributions

For UI or feature changes:

1. Fork the repo and create a branch
2. Run `npm run dev` to start the local server
3. Make your changes
4. Run `npm run lint` and `npm run format:check` before committing
5. Submit a pull request

## Code Style

- TypeScript strict mode; no `any` types
- Tailwind CSS for styling; avoid inline styles
- Keep components small and focused
- Use `next-intl` translation keys for any user-facing text

## Data Quality Guidelines

When adding a project:

- Write descriptions from the user's perspective ("helps you build X", not "is a X")
- Set `status` accurately: `active` for repos with commits in the last 6 months
- Include a `github` link; `docs` is optional but appreciated
- Set `suitableFor` based on who would realistically use the project

## License

This repository uses a split license — see [LICENSE-CONTENT.md](LICENSE-CONTENT.md):

- Contributions to **software code and navigator data** (e.g. `src/`, `scripts/`,
  `src/data/projects.ts`, `messages/`) are licensed under the Apache License 2.0.
- Contributions to **content areas** (`src/data/knowledge/`, classroom and news
  editorial files) are accepted under the repository's content terms: you keep
  copyright in your contribution and grant Alex Chen a perpetual, worldwide,
  royalty-free license to use, modify, publish, and sublicense it as part of
  OpenHW Explorer and derived learning materials.

By submitting a pull request, you agree to the terms above for the files you touch.
