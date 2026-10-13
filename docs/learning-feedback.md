# Private course suggestions

The bilingual Learning Hub now lets a reader choose a course format, technical directions and an optional question/contact email. Feedback goes privately to Alex's already-verified inbox. It is not a public vote, mailing list or course commitment. The global footer retains Alex's LinkedIn and public contact email.

## Runtime boundary

The website stays on static Cloudflare Pages. The separate `openhw-explorer-feedback` Worker handles only `openhwexplorer.com/api/learning-feedback*`, with exact-path validation. It does not intercept normal pages, news snapshots, course audio or conference redirects. Vercel and the legacy Pages mirror send to this canonical endpoint; CORS allows only the explicit production hostnames. Preview deployments do not have a production submission Origin.

The Worker sends from hello@openhwexplorer.com directly to the private verified destination used by Email Routing (not via another forwarding hop). `FEEDBACK_TO` is a Worker secret, never a public frontend variable or committed personal address. Optional contact email is used only as Reply-To. No autoresponder or subscription is created. The site keeps no feedback database; received suggestions remain in Alex's inbox for planning/follow-up. Logs contain a reference ID or generic failure only, not the feedback or contact address.

The response confirms acceptance by the mail service, not guaranteed inbox delivery. Failure returns 503 and the form retains input. Cloudflare rate-limit bindings throttle the endpoint at each edge location; they are approximate, not a global hard quota. Payloads are streamed with an 8192-byte cap and all fields are validated. Origin checks, JSON-only requests and a honeypot reduce unsolicited browser posts; Origin is not authentication and sophisticated spam remains possible. No paid plan was activated.

## Maintenance

Normal main updates continue to publish the frontend automatically to Vercel and both Pages projects. The backend is a separate Worker; its code/config changes require an explicit Wrangler publication with Workers Scripts and Workers Routes permissions. The existing Pages-only CI credential is deliberately not expanded or replaced. Do not silently upload a new backend using that token. Routine news/course updates need no Worker publication.

```sh
npx wrangler@4.150.0 types workers/learning-feedback/worker-configuration.d.ts --config workers/learning-feedback/wrangler.jsonc --env-interface FeedbackEnv
npx tsc -p workers/learning-feedback/tsconfig.json
npx wrangler@4.150.0 deploy --dry-run --config workers/learning-feedback/wrangler.jsonc
npx wrangler@4.150.0 deploy --config workers/learning-feedback/wrangler.jsonc --keep-vars
```

For local type generation, create an ignored `workers/learning-feedback/.dev.vars` containing a dummy `FEEDBACK_TO` string. For production, set the real verified address using `wrangler secret put FEEDBACK_TO --config workers/learning-feedback/wrangler.jsonc` (or file-based secret bulk). Never log it. The committed config restricts the sender; the destination is fixed by the server secret and cannot be chosen by a visitor.

`NEXT_PUBLIC_LEARNING_FEEDBACK_PREVIEW=1` retains the local no-send design mode. Public builds must omit it or use 0. `NEXT_PUBLIC_ENABLE_LEARNING_FEEDBACK=false` restores the former contact section for emergency withdrawal; rebuild is required. Disabling or rolling back the Worker affects only the feedback API. Keep the existing Pages-to-.com redirect and email routing rules.

References: [Email binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/), [verified-address pricing](https://developers.cloudflare.com/email-service/platform/pricing/), [rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
