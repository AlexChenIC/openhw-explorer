import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { supportedLocales } from "./locales";

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale: "en",
});

// Lightweight wrappers around Next.js navigation APIs
// that handle the locale prefix transparently
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
