import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ecosystemCategories, ecosystemEntries } from "@/data/ecosystem";

describe("ecosystem directory", () => {
  it("contains a focused first release with unique ids and official HTTPS links", () => {
    expect(ecosystemEntries.length).toBeGreaterThanOrEqual(12);
    expect(ecosystemEntries.length).toBeLessThanOrEqual(20);
    expect(new Set(ecosystemEntries.map((entry) => entry.id)).size).toBe(ecosystemEntries.length);

    for (const entry of ecosystemEntries) {
      expect(entry.url, entry.id).toMatch(/^https:\/\//);
      expect(entry.logo, entry.id).toMatch(/^\/ecosystem\/.+\.png$/);
      expect(existsSync(join(process.cwd(), "public", entry.logo.slice(1))), entry.id).toBe(true);
      expect(entry.summary.en, entry.id).toBeTruthy();
      expect(entry.summary.zh, entry.id).toBeTruthy();
    }
  });

  it("uses every declared category and only declared categories", () => {
    const categoryIds = new Set(ecosystemCategories.map((category) => category.id));

    for (const category of ecosystemCategories) {
      expect(
        ecosystemEntries.some((entry) => entry.category === category.id),
        category.id,
      ).toBe(true);
    }

    for (const entry of ecosystemEntries) {
      expect(categoryIds.has(entry.category), entry.id).toBe(true);
    }
  });
});
