import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_URL, resolveSiteUrl } from "@/lib/site-url";

describe("resolveSiteUrl", () => {
  it("uses the production URL when configuration is missing or invalid", () => {
    expect(resolveSiteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("not a url")).toBe(DEFAULT_SITE_URL);
    expect(resolveSiteUrl("https://<your-project>.vercel.app")).toBe(DEFAULT_SITE_URL);
  });

  it("normalizes a configured site URL to its origin", () => {
    expect(resolveSiteUrl("https://explorer.example.org/path/")).toBe(
      "https://explorer.example.org",
    );
  });
});
