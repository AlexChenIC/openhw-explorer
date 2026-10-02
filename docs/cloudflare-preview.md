# Cloudflare evaluation deployment

This branch adds an independent Cloudflare Workers test deployment of the public
site. The existing Vercel deployment remains the production entry point.

Test URL: https://openhw-explorer-test.junchao-chen-sc.workers.dev/zh/classroom

## Build and deploy

Use Node 22 or later, install the lockfile, and authenticate Wrangler to the intended
account. No credentials belong in this repository.

```sh
npm ci
npm run typecheck:cloudflare
npm run build:vinext
npm run start:vinext
# After checking the local preview:
npx wrangler deploy --config dist/server/wrangler.json
```

`build:vinext` generates Cloudflare types, disables Vercel Analytics and marks
application responses `X-Robots-Tag: noindex, nofollow`. Canonical URLs intentionally
continue to identify the production website. Do not use the temporary test hostname
as the permanent domain or print it on conference material.

The Next.js commands remain available. Vinext and Next.js both generate route types
under `.next`; regenerate Next.js types before an independent Next.js type check:

```sh
npx next typegen
npx tsc --noEmit
npm test
npm run lint
npm run check:data-quality
npm run build
```

The Cloudflare entry and generated platform declarations use a separate TypeScript
configuration, so a fresh Next.js checkout does not require generated Worker types.

## Runtime choices

- Vinext 1.0.1 with the documented Wrangler integration; this is a framework
  compatibility evaluation, not production migration approval.
- Static Assets store public assets and 108 prerendered routes. There are no R2,
  KV, D1, Durable Object, paid image-optimization, or external-origin bindings.
- `next-intl/config` resolves to the existing request configuration. Public content
  is explicitly static, and preview alternate Link headers are disabled to avoid
  retaining local prerender origins. HTML canonical/hreflang metadata is retained.
- A Worker entry blocks direct access to the internal prerender cache directory.
- Course asset requests pass through the Worker. Audio Range requests have a small,
  bounded fallback when the asset service returns the full file. A build-time size
  manifest covers local MP3s; the fallback will never buffer unknown assets or
  assets above 2 MiB. All current course clips are smaller than that bound.
- The Satori transitive `fflate` dependency is constrained to the patched 0.7.x
  release. Third-party notices are regenerated with complete license text.

The prerenderer reports eight `RSC handler returned 307` entries: two withdrawn
Industry routes and six player URLs with the wrong locale. These are deliberate
runtime redirects, not eight broken public course pages. The API route and catch-all
route are not prerendered. Runtime HTTP checks must still verify those redirects.

## Cost and release boundary

This deployment does not purchase a domain, upgrade a plan, or enable paid add-ons.
Workers Free currently includes 100,000 Worker requests/day and 10 ms CPU per
request; static asset requests that bypass the Worker are free and unlimited.
Course asset requests and HTML handling do invoke the Worker, so they are subject
to the account's Worker limits. This is suitable for evaluation, not a promise of
unlimited free conference traffic. The OAuth session cannot read billing
subscriptions; the account's existing billing plan was not independently verified.

Ordinary Cloudflare hosting does not guarantee Mainland China access. Validate
DNS, HTTPS, page loading, navigation, audio start/seek and external feedback links
on actual Mainland China operators and devices. A custom domain may behave
differently from workers.dev and requires a separate check.

Before production migration: confirm the permanent name/domain and ownership,
complete Mainland China and mobile testing, inspect runtime limits under realistic
load, decide on image optimization/analytics, resolve any remaining adapter issues,
and configure production canonical URLs and CI deployment credentials. Keep the
Vercel deployment available for rollback.

Official references:
- https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- https://vinext.dev/docs/deploying/cloudflare
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- https://developers.cloudflare.com/china-network/
