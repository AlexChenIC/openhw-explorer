import digest from "@/data/news-digest.json";
import status from "@/data/news-review-status.json";
import { resolveNewsReviewStatus } from "@/lib/news-review-status.mjs";

export const dynamic = "force-static";

export function GET() {
  const review = resolveNewsReviewStatus(status, digest.generatedAt);
  return Response.json({
    editorialUpdatedAt: digest.generatedAt,
    itemCount: digest.items.length,
    lastCheckedOn: review?.checkedOn || null,
    lastCheckOutcome: review?.outcome || null,
    lastCheckAddedCount: review?.addedCount ?? null,
    latestSourceDate: digest.items.map((item) => item.publishedAt).filter(Boolean).sort().at(-1) || null,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
  });
}
