// Add a route, message catalog, and metadata support before adding a locale here.
// The header reads this list directly, so new supported languages appear in its menu.
export const localeOptions = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
] as const;

export const supportedLocales = localeOptions.map((locale) => locale.code) as ["en", "zh"];

export type SiteLocale = (typeof localeOptions)[number]["code"];
