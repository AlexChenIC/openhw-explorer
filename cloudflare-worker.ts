import app from "vinext/server/fetch-handler";
import { applyMediaRange } from "./src/lib/media-range";

export * from "vinext/server/fetch-handler";

declare const __OPENHW_AUDIO_SIZES__: Record<string, number>;

export default {
  async fetch(request, env, ctx) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/_vinext/static-cache" || pathname.startsWith("/_vinext/static-cache/")) {
      return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
    }
    if (pathname.startsWith("/classroom-assets/") && pathname.endsWith(".mp3")) {
      return applyMediaRange(
        request,
        await env.ASSETS.fetch(request),
        __OPENHW_AUDIO_SIZES__[pathname],
      );
    }
    return app.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
