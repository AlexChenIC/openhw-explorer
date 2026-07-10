import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ecosystemCategories, ecosystemEntries } from "@/data/ecosystem";

describe("ecosystem directory", () => {
  it("contains a focused first release with unique ids and official HTTPS links", () => {
    expect(ecosystemEntries.length).toBeGreaterThanOrEqual(12);
    expect(ecosystemEntries.length).toBeLessThanOrEqual(40);
    expect(new Set(ecosystemEntries.map((entry) => entry.id)).size).toBe(ecosystemEntries.length);
    expect(new Set(ecosystemEntries.map((entry) => entry.url)).size).toBe(ecosystemEntries.length);

    for (const entry of ecosystemEntries) {
      expect(entry.url, entry.id).toMatch(/^https:\/\//);
      expect(Boolean(entry.logo) !== Boolean(entry.mark), entry.id).toBe(true);
      if (entry.logo) {
        expect(entry.logo, entry.id).toMatch(/^\/ecosystem\/.+\.png$/);
        expect(existsSync(join(process.cwd(), "public", entry.logo.slice(1))), entry.id).toBe(true);
      }
      if (entry.mark) {
        expect(entry.mark.label, entry.id).toBeTruthy();
        expect(entry.mark.node, entry.id).toMatch(/^\d+ nm$/);
      }
      expect(entry.summary.en, entry.id).toBeTruthy();
      expect(entry.summary.zh, entry.id).toBeTruthy();
      expect(entry.entityType.en, entry.id).toBeTruthy();
      expect(entry.entityType.zh, entry.id).toBeTruthy();
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

  it("distinguishes institutions from the projects they steward", () => {
    const byId = new Map(ecosystemEntries.map((entry) => [entry.id, entry]));

    expect(byId.get("bosc")?.category).toBe("regional");
    expect(byId.get("xiangshan")?.category).toBe("projects");
    expect(byId.get("xiangshan")?.relationship?.en).toContain("BOSC");
    expect(byId.get("bosc")?.relationship?.en).toContain("XiangShan");
    expect(byId.get("shakti")?.category).toBe("projects");
    expect(byId.has("openchip")).toBe(false);
  });

  it("separates foundry-linked and predictive PDKs", () => {
    const pdks = ecosystemEntries.filter((entry) => entry.category === "pdk");
    const byId = new Map(pdks.map((entry) => [entry.id, entry]));

    expect(pdks).toHaveLength(8);
    expect(byId.get("icsprout55")?.mark?.node).toBe("55 nm");
    expect(byId.get("freepdk45")?.relationship?.en).toBe("Not manufacturable");
    expect(byId.get("asap7")?.relationship?.en).toBe("Not manufacturable");
    expect(byId.get("pkp3")?.relationship?.en).toBe("Not manufacturable");
    expect(byId.get("skywater-sky130")?.entityType.en).toContain("Foundry-linked");
    expect(byId.get("globalfoundries-gf180mcu")?.entityType.en).toContain("Foundry-linked");
  });
});
