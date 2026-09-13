import type { SiteLocale } from "@/lib/locales";

// Keep navigation independent of the large published lesson packages.
export const classroomRoutes: Record<string, Partial<Record<SiteLocale, string>>> = {
  "cva6-project-intro": { en: "cva6-project-intro-en", zh: "cva6-project-intro-zh" },
  "core-v-names": {
    en: "openhw-essentials-core-v-names-en",
    zh: "openhw-essentials-core-v-names-zh",
  },
  foundation: {
    en: "openhw-essentials-foundation-en",
    zh: "openhw-essentials-foundation-zh",
  },
};
