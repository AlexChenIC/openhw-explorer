export const DEFAULT_SITE_URL = "https://openhw-explorer.vercel.app";

export function resolveSiteUrl(value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized || /[<>]/.test(normalized) || /%3c|%3e/i.test(normalized)) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_URL;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
