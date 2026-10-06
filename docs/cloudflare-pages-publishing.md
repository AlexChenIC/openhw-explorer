# Cloudflare Pages mirror publication

Target: https://openhw-explorer-test.pages.dev. The existing hostname and project are retained, including conference QR links. Vercel remains available; no domain purchase, project rename, paid service or production-domain migration is included.

## Publication flow

`.github/workflows/cloudflare-pages.yml` validates and statically builds pull requests without deployment secrets. A push or merge to `main` builds the same committed content and uploads it to the existing Pages production branch, `pages-preview`. It then checks the live deployment's commit, editorial timestamp, news count, bilingual pages, course audio hashes, redirects and 404 behavior. Manual reruns use `workflow_dispatch` on `main`.

Curated news still follows its source-checked PR workflow. Candidate collection alone does not change published news. Once a curated PR is merged, both Vercel and Pages receive the main-branch update. No publication date is advanced merely to appear active.

## Credentials

- Repository secret `CLOUDFLARE_API_TOKEN`: a dedicated token with Account / Cloudflare Pages / Edit, restricted to this Cloudflare account. Never commit it or reuse the local Wrangler OAuth token in CI.
- Repository variable `CLOUDFLARE_ACCOUNT_ID`: the current Pages account ID. It is an identifier, not a secret.
- No Global API Key, DNS-edit permission or registrar permission is needed. Secrets are unavailable to pull-request build steps.
- A missing credential makes the deployment fail clearly rather than pretending synchronization succeeded. Inspect the Cloudflare Pages workflow run after setup.

## Build boundary

`npm run build:pages` builds a disposable copy under ignored `build/pages-source/`, leaving the normal Next.js build unchanged. Server-only locale proxy/catch-all routes are replaced by exact Pages redirects; unknown paths still return 404. Withdrawn courses and the disabled Industry section remain withdrawn. Only correctly localized players are statically exported.

The Pages mirror serves HTML, JS, images, course media and a build-time `/api/news-status` JSON snapshot without Pages Functions or a database. Statistics and news come from committed JSON files; the build does not independently refresh editorial data. Vercel Analytics is disabled for Pages only. The existing test noindex headers and Vercel canonical URLs are intentionally retained until a permanent-domain release is approved. A runtime-backed endpoint added later requires a separate Pages compatibility decision.

Wrangler is version-pinned in the deployment step and installed as a CI tool, not added to the website's production dependencies. Deployment checks report to `reports/pages-deployment-verification.json` locally and fail the CI job on mismatch. Site tests must be repeated on real Mainland China networks; successful CI requests do not establish nationwide reachability.

## Recovery

Correct the failed build or credential, then rerun the workflow on the current `main`. Keep production uploads serialized. Do not upload an old local checkout after CI is enabled, as that can overwrite the current mirror. The Cloudflare dashboard's deployment history provides rollback; rolling back only Pages intentionally makes it differ from `main` until it is redeployed.

Reference: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
