import { classroomRoutes } from "@/data/classroom-routes";
import type { SiteLocale } from "@/lib/locales";

// next-intl supplies an unprefixed pathname; query and fragment are user state.
export function localeHref(pathname: string, search: string, hash: string, locale: SiteLocale) {
  const playerId = pathname.match(/^\/classroom-player\/([^/]+)$/)?.[1];
  if (playerId) {
    const versions = Object.values(classroomRoutes).find((entry) => Object.values(entry).includes(playerId));
    const translatedId = versions?.[locale];
    if (translatedId) pathname = `/classroom-player/${translatedId}`;
  }
  return `${pathname}${search}${hash}`;
}
