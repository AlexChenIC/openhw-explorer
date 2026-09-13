import type { SiteLocale } from "@/lib/locales";

// Keep navigation independent of the large published lesson packages.
export const classroomRoutes: Record<string, Partial<Record<SiteLocale, string>>> = {
  "core-v-names": {
    en: "openhw-essentials-core-v-names-en",
    zh: "openhw-essentials-core-v-names-zh",
  },
  foundation: {
    en: "openhw-essentials-foundation-en",
    zh: "openhw-essentials-foundation-zh",
  },
};
