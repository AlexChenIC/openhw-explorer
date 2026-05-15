# OpenHW Explorer Brand System

This is the lightweight brand direction for OpenHW Explorer and AlexChen's OpenHW learning work.

## Positioning

OpenHW Explorer is a community-friendly navigator and learning hub for OpenHW and open-source RISC-V hardware. It should feel technical, trustworthy, memorable, and curated, not like a temporary demo.

## Visual Principle

The brand can take tonal inspiration from the OpenHW ecosystem: deep navy, engineering blue, hardware green, and clean technical typography. It must not copy the OpenHW Foundation logo, globe mark, wordmark, or official layout.

## Logo Concept

The selected direction is the wordmark concept:

- A rounded deep-blue `OH` mark.
- A stylized white `X` underneath the `OH`, standing for Explorer and crossing paths.
- A small hardware-green accent to connect the brand to open hardware and board-level signal energy.
- A two-line `OpenHW / Explorer` wordmark with Explorer emphasized in engineering blue.
- The optional tagline: `EXPLORE • LEARN • BUILD`.

The logo should read quickly in a browser tab, website header, slide deck, classroom embed, and social profile. The full wordmark is preferred when horizontal space is available; the square mark is used for favicons and compact UI.

## Palette

- Explorer navy: `#0B1736`
- Explorer blue: `#0B5CAB`
- Route green: `#2FE38C`
- Signal cyan: `#20C7B7`
- Dark surface: `#0B1020`
- Light surface: `#F7FAFC`

These colors are implemented through CSS variables in `src/app/globals.css`.

## Implementation

- `public/brand/openhw-explorer-mark.svg`: reusable square mark.
- `public/brand/openhw-explorer-wordmark.svg`: full vector wordmark for light surfaces.
- `public/brand/openhw-explorer-wordmark-dark.svg`: full vector wordmark for dark surfaces.
- `src/app/icon.svg`: browser favicon.
- `public/apple-icon.svg`: app icon.
- `src/components/BrandMark.tsx`: React wrapper that renders the stored SVG assets directly.
- `src/components/Header.tsx`: primary brand lockup.
- `src/components/Footer.tsx`: secondary brand lockup.

## Usage Rules

- Use the full lockup in navigation and footer.
- Use the icon alone only where the available space is small, such as favicon or compact app surfaces.
- The website should render the stored SVG assets directly. Do not rebuild the logo from separate HTML text and paths unless the SVG source is updated at the same time.
- Keep the green accent small; the brand should remain primarily deep blue and engineering blue.
- Do not put legal/status qualifiers in the main visual lockup.
- Keep trademark and affiliation boundaries in documentation/about copy when needed, not in every persistent brand surface.
- Do not use the official OpenHW logo as this site's identity.
- For future course pages, keep AlexChen's teacher/avatar identity as the presenter layer and use OpenHW Explorer as the publishing/navigation layer.

## Reference Notes

- GitHub Brand Toolkit: logo, color, and type are foundations for recognition and should be used consistently.
- Base brand-kit: keep symbol and wordmark as reusable assets.
- O3DE Brand Guidelines: preserve logo consistency, clear space, and avoid confusing modifications or co-branding.
