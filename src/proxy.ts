import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { features } from "@/lib/features";
import { routing } from "@/lib/routing";
import {
  getPublicLessonByClassroomId,
  getPublicLessonById,
  getPublicSeriesById,
} from "@/data/classroom-publication";
import { getClassroomIdForLocale } from "@/data/classrooms";

const handleIntlRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const industryMatch = request.nextUrl.pathname.match(/^\/(en|zh)\/resources\/industry\/?$/);
  if (!features.industryLandscapeEnabled && industryMatch) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${industryMatch[1]}/resources`;
    destination.search = "";
    return NextResponse.redirect(destination, 307);
  }

  const classroomDetailPath = /^\/(en|zh)\/(classroom\/.+|classroom-player\/.+)$/;
  const match = request.nextUrl.pathname.match(classroomDetailPath);

  if (match) {
    const [, locale, route, seriesOrPlayerId, lessonId] = request.nextUrl.pathname.split("/");
    const player = route === "classroom-player" && getPublicLessonByClassroomId(seriesOrPlayerId);
    const isPublic =
      route === "classroom-player"
        ? Boolean(player)
        : lessonId
          ? Boolean(getPublicLessonById(seriesOrPlayerId, lessonId))
          : Boolean(getPublicSeriesById(seriesOrPlayerId));
    const localizedPlayerId = player && getClassroomIdForLocale(player.lesson, locale);
    if (!isPublic || (localizedPlayerId && localizedPlayerId !== seriesOrPlayerId)) {
      const destination = request.nextUrl.clone();
      destination.pathname =
        isPublic && localizedPlayerId
          ? `/${locale}/classroom-player/${localizedPlayerId}`
          : `/${locale}/classroom`;
      destination.search = "";
      return NextResponse.redirect(destination, 307);
    }
  }

  return handleIntlRouting(request);
}

export const config = {
  // Match all pathnames except: api, _next, static files
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
