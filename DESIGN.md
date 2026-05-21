# OpenHW Explorer Design System

This document defines the visual and interaction rules for OpenHW Explorer. It is intended for future AI agents and human maintainers so new pages, course features, news workflows, and resource directories stay coherent.

## Product Character

OpenHW Explorer is a professional learning and research navigation site for open hardware, RISC-V, and OpenHW ecosystem work. It should feel like a calm technical workspace, not a marketing landing page and not a generic card dashboard.

The preferred tone is:

- Precise and trustworthy
- Light, spacious, and readable
- Technically serious, but not cold
- Curated rather than exhaustive on first view
- Layered: overview first, then drill down

## Visual Direction

The target style is a blend of:

- Apple-like quiet surfaces, strong typography, and careful whitespace
- Vercel-like developer clarity and restrained component hierarchy
- IBM/engineering documentation discipline: strong information structure, low ornamentation
- OpenHW Explorer brand colors: deep navy, reliable blue, and a small green signal

Avoid:

- Pure white pages with many undifferentiated cards
- Decorative gradients as the main design language
- Heavy shadows, glowing cards, and excessive rounded pills
- One-screen pages that flatten multiple product areas
- Overusing green, orange, or purple as decorative accents

## Color System

Use a light-first design. Dark mode is supported, but public pages should be optimized for the light theme first.

### Light Theme Intent

The light theme uses an off-white canvas, white content surfaces, thin hairline borders, and a restrained blue action color.

The homepage hero may use a pale blue technical gradient wash. Keep it full-bleed, soft, and quiet; it should feel like a high-quality product surface, not decorative blobs or bokeh. Content sections after the hero should return to the off-white canvas and white surfaces for readability.

Primary token mapping:

| Token              | Role                  | Preferred Value |
| ------------------ | --------------------- | --------------- |
| `--bg-dark`        | Page canvas           | `#f5f7fb`       |
| `--bg-card`        | Main surface/card     | `#ffffff`       |
| `--bg-card-hover`  | Hover surface         | `#f8fafc`       |
| `--border`         | Hairline border       | `#dfe7f0`       |
| `--primary`        | Link/action blue      | `#0b5cab`       |
| `--primary-dark`   | Hover/active blue     | `#084a8f`       |
| `--green`          | Success/OpenHW signal | `#16a34a`       |
| `--text-primary`   | Main text             | `#1d1d1f`       |
| `--text-secondary` | Secondary text        | `#5f6b7a`       |
| `--text-tertiary`  | Metadata text         | `#8592a3`       |

Green should usually mean success, completion, OpenHW signal dots, or positive status. Do not use it as a generic decoration.

Orange and purple should be rare. Use them only when a page needs semantic distinction, such as alerts, category differences, or data visualization.

## Typography

Use the existing system stack with Inter and native Apple/system fonts:

- Headings: compact, confident, not oversized inside tools or dashboards.
- Body text: clear 15-18px equivalent, generous line-height for Chinese and English.
- Metadata: smaller but still readable, never low-contrast.
- Technical terms: preserve exact names and casing, for example CVA6, RISC-V, CORE-V, SystemVerilog.

Do not scale font size directly with viewport width. Use responsive breakpoints and fixed type steps.

## Layout Rules

OpenHW Explorer should use layered information architecture:

1. Top-level landing or hub page
2. Series/category page
3. Detail page
4. Player/editor/workflow page where needed

Do not put every feature or every item on one long flat page. For growing areas such as Learning Hub, Resources, News, and Courses, always introduce grouping and drill-down paths.

Recommended content widths:

- Main content: `max-w-7xl`
- Reading content: `max-w-3xl` to `max-w-4xl`
- Dashboards: dense but divided into tabs or subpages
- Course pages: focus the lesson/player, keep operator controls out of public pages

## Components

### Header

The header should be quiet and persistent. Use the brand lockup, clear navigation, language switcher, and theme toggle. Avoid adding badges, disclaimers, or secondary promotional text in the header.

The `#projects` anchor belongs to the homepage hero/main presentation area. Use `#project-list` for the actual project directory and filter grid. This keeps direct visits to `/en#projects` visually oriented instead of dropping the reader straight into filters.

### Cards

Cards are for grouped items, not for every page section. Use:

- Radius: 12px for most cards
- Border: one hairline
- Shadow: very light in light mode
- Hover: subtle border/color change, small translate at most

Avoid nested cards unless the inner card is a real repeated item or data block.

### Pills and Tags

Use pills sparingly:

- Category labels
- Status labels
- Filter chips

Avoid large numbers of decorative pills in dense technical content.

### Buttons and Links

Primary buttons use `--primary`; secondary buttons use white/surface with a hairline border. External links should be obvious but not loud. Icon + text is preferred for operational actions.

## Page-Specific Guidance

### Resources

The Resources page is a curated map, not a bookmark dump.

Required structure:

- Hero summary
- Category navigation
- Featured starting points
- Category sections
- Attribution/source note

Future improvements should add:

- Search
- Filter by type: specification, tool, learning, project, community, commercial
- Quality signals: official, trusted, community, commercial
- Last checked date for links

### Learning Hub

Use a course-catalog model:

- Top-level learning center
- Series pages
- Unit/skill/lesson pages
- Lesson player pages

Do not expose operator/dashboard controls on public classroom pages.

### News

News should be a reviewed editorial flow. Automated discovery can create candidates, but public publishing should remain review-gated.

### Operator Dashboard

The dashboard is for site maintenance, not public reading. It should be light, structured, and tabbed by workflow:

- Courses
- News
- Resources
- Publishing
- System notes

Do not build a single long dashboard page.

## Accessibility and Quality

Every page should satisfy:

- Clear heading hierarchy
- Keyboard focus states
- Sufficient contrast on light and dark themes
- Mobile text never clipped
- No layout shift caused by hover states
- External links open in a new tab with `rel="noopener noreferrer"`

## Implementation Rules

When changing UI:

1. Prefer CSS token updates before editing many components.
2. Keep color usage semantic.
3. Verify `/en` and `/zh` routes.
4. Run `npm run lint` and `npm run build`.
5. After `next build`, restart local `next dev` before browser verification because build and dev both write `.next`.

## References

- Apple Human Interface Guidelines: color, typography, hierarchy, and platform-level restraint.
- Vercel design language: developer clarity, simple surfaces, strong contrast.
- VoltAgent `awesome-design-md`: useful pattern for storing design guidance as AI-readable Markdown.
- RISC-V Ottawa Resources: inspiration for the resource-directory taxonomy, with attribution recorded in `docs/third-party-attributions.md`.
