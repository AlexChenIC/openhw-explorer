import { describe, expect, it } from "vitest";
import en from "../messages/en.json";
import zh from "../messages/zh.json";
import { filterConfig, quickFilterTags } from "@/data/filters";

function collectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return collectKeys(value as Record<string, unknown>, path);
    }
    return [path];
  });
}

describe("i18n message parity", () => {
  it("en and zh expose exactly the same keys", () => {
    const enKeys = new Set(collectKeys(en));
    const zhKeys = new Set(collectKeys(zh));
    const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));
    const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k));
    expect(missingInZh, "keys missing in zh.json").toEqual([]);
    expect(missingInEn, "keys missing in en.json").toEqual([]);
  });
});

describe("filter config has matching translations", () => {
  const filters = en.filters as Record<string, unknown>;

  it("quick tags", () => {
    for (const tag of quickFilterTags) {
      expect(filters[tag.id], `filters.${tag.id}`).toBeTruthy();
    }
  });

  it("roles", () => {
    const roles = filters.roles as Record<string, unknown>;
    for (const role of filterConfig.roles) {
      expect(roles[role.id], `filters.roles.${role.id}`).toBeTruthy();
    }
  });

  it("categories", () => {
    const categories = filters.categories as Record<string, unknown>;
    for (const category of filterConfig.categories) {
      expect(categories[category.id], `filters.categories.${category.id}`).toBeTruthy();
    }
  });

  it("core types", () => {
    const coreTypes = filters.coreTypes as Record<string, unknown>;
    for (const coreType of filterConfig.coreTypes) {
      expect(coreTypes[coreType.id], `filters.coreTypes.${coreType.id}`).toBeTruthy();
    }
  });

  it("verification types", () => {
    const verificationTypes = filters.verificationTypes as Record<string, unknown>;
    for (const verificationType of filterConfig.verificationTypes) {
      expect(
        verificationTypes[verificationType.id],
        `filters.verificationTypes.${verificationType.id}`,
      ).toBeTruthy();
    }
  });
});
