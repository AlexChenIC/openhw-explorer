import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { features } from "@/lib/features";
import { routing } from "@/lib/routing";

const handleIntlRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const classroomDetailPath = /^\/(en|zh)\/(classroom\/.+|classroom-player\/.+)$/;
  const match = request.nextUrl.pathname.match(classroomDetailPath);

  if (!features.classroomCoursesEnabled && match) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${match[1]}/classroom`;
    destination.search = "";
    return NextResponse.redirect(destination, 308);
  }

  return handleIntlRouting(request);
}

export const config = {
  // Match all pathnames except: api, _next, static files
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
