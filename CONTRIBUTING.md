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

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
