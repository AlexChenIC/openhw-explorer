import digest from "@/data/news-digest.json";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    editorialUpdatedAt: digest.generatedAt,
    itemCount: digest.items.length,
    latestSourceDate: digest.items.map((item) => item.publishedAt).filter(Boolean).sort().at(-1) || null,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
  });
}
