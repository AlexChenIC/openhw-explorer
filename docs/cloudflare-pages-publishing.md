# Cloudflare Pages mirror publication

Public canonical domain: https://openhwexplorer.com, attached to the `openhw-explorer` Pages project. A zone-level Cloudflare Redirect Rule sends `www.openhwexplorer.com` to it while preserving paths and query strings; Pages `_redirects` cannot match source hostnames. Account-level Bulk Redirect list `openhw_explorer_pages_to_com` sends the exact `openhw-explorer.pages.dev` hostname to `https://openhwexplorer.com` with HTTP 301, preserving subpaths and query strings. This keeps the already-submitted conference QR code pointing to the current public domain. Include subdomains is disabled so preview hostnames remain available. The older https://openhw-explorer-test.pages.dev remains a mirror. Both projects still receive the same artifact with production branch `pages-preview`. Vercel remains available.

## Publication flow

`.github/workflows/cloudflare-pages.yml` validates and statically builds pull requests without deployment secrets. A push or merge to `main` builds the same committed content and uploads it to both Pages projects. After each upload it checks the live deployment's commit, editorial timestamp, completed review status, news count, bilingual pages, course audio hashes, redirects and 404 behavior. Manual reruns use `workflow_dispatch` on `main`.

Curated news still follows its source-checked PR workflow. Candidate collection alone does not change published news. Once a curated PR is merged, both Vercel and Pages receive the main-branch update. No publication date is advanced merely to appear active.

## Credentials

- Repository secret `CLOUDFLARE_API_TOKEN`: a dedicated token with Account / Cloudflare Pages / Edit, restricted to this Cloudflare account. Never commit it or reuse the local Wrangler OAuth token in CI.
- Repository variable `CLOUDFLARE_ACCOUNT_ID`: the current Pages account ID. It is an identifier, not a secret.
- No Global API Key, DNS-edit permission or registrar permission is needed. Secrets are unavailable to pull-request build steps.
- A missing credential makes the deployment fail clearly rather than pretending synchronization succeeded. Inspect the Cloudflare Pages workflow run after setup.

## Build boundary

`npm run build:pages` builds a disposable copy under ignored `build/pages-source/`, leaving the normal Next.js build unchanged. Server-only locale proxy/catch-all routes are replaced by exact Pages redirects; unknown paths still return 404. Withdrawn courses and the disabled Industry section remain withdrawn. Only correctly localized players are statically exported.

The Pages sites serve HTML, JS, images, course media and a build-time `/api/news-status` JSON snapshot without Pages Functions or a database. Statistics and news come from committed JSON files; the build does not independently refresh editorial data. Vercel Analytics is disabled for Pages only. Canonical, language-alternate and sitemap URLs use `https://openhwexplorer.com`. Host-specific noindex headers remain on Pages mirrors and preview hostnames, while the public domain can be indexed. Individual Demo courses retain their metadata noindex and sitemap exclusion. The CI verifies all three Pages addresses, including canonical URLs and the www redirect. Primary Pages verification sets `PAGES_EXPECT_REDIRECT_TO=https://openhwexplorer.com`: each request must first return the exact 301 destination with its path and query retained, then the destination must pass the normal page/media/snapshot/404 checks. The legacy mirror retains its noindex verification. The private course-feedback API is handled by a separate, narrowly routed Worker on the canonical .com domain; see docs/learning-feedback.md. It does not add Pages Functions or affect static asset delivery. Publication also verifies its health without sending feedback.

The Bulk Redirect is persistent account configuration; ordinary Pages uploads do not overwrite it. To undo it, disable its rule in Cloudflare and remove `PAGES_EXPECT_REDIRECT_TO` from primary verification in the workflow. Reference: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## One-time activation

Create a dedicated token in https://dash.cloudflare.com/profile/api-tokens with only Account / Cloudflare Pages / Edit for the intended account, then add it as `CLOUDFLARE_API_TOKEN` at https://github.com/AlexChenIC/openhw-explorer/settings/secrets/actions. Do not send the token in chat. `CLOUDFLARE_ACCOUNT_ID` is already configured as a repository variable. After the secret exists, merge this publication PR and verify the actual main-branch workflow and both live snapshots. Preview builds passing or a successful local upload do not mean automatic publishing is active.

Wrangler is version-pinned in the deployment step and installed as a CI tool, not added to the website's production dependencies. Deployment checks report to `reports/pages-deployment-verification.json` locally and fail the CI job on mismatch. Site tests must be repeated on real Mainland China networks; successful CI requests do not establish nationwide reachability.

## Recovery

Correct the failed build or credential, then rerun the workflow on the current `main`. Keep production uploads serialized. Do not upload an old local checkout after CI is enabled, as that can overwrite the current mirror. The Cloudflare dashboard's deployment history provides rollback; rolling back only Pages intentionally makes it differ from `main` until it is redeployed.

Reference: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
