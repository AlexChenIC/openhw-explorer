import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except: api, _next, static files
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
