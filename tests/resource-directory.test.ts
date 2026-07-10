import { describe, expect, it } from "vitest";
import { resourceDirectoryCategories, resourceDirectoryLinks } from "@/data/resources";

describe("technical resource directory", () => {
  it("keeps a focused task-oriented taxonomy", () => {
    const categoryIds = resourceDirectoryCategories.map((category) => category.id);

    expect(categoryIds).toEqual([
      "standards-docs",
      "learning",
      "hdls",
      "toolchains",
      "simulation",
      "design-tools",
      "verification-tools",
      "commercial",
    ]);
    expect(resourceDirectoryLinks.length).toBeGreaterThanOrEqual(40);
    expect(resourceDirectoryLinks.length).toBeLessThanOrEqual(55);
  });

  it("uses unique ids, declared categories, and secure external links", () => {
    const categoryIds = new Set(resourceDirectoryCategories.map((category) => category.id));

    expect(new Set(resourceDirectoryLinks.map((link) => link.id)).size).toBe(
      resourceDirectoryLinks.length,
    );

    for (const category of resourceDirectoryCategories) {
      expect(
        resourceDirectoryLinks.some((link) => link.category === category.id),
        category.id,
      ).toBe(true);
    }

    for (const link of resourceDirectoryLinks) {
      expect(categoryIds.has(link.category), link.id).toBe(true);
      expect(link.url, link.id).toMatch(/^https:\/\//);
      expect(link.summary.en, link.id).toBeTruthy();
      expect(link.summary.zh, link.id).toBeTruthy();
    }
  });

  it("does not duplicate ecosystem organizations or project browsing", () => {
    const misplacedIds = [
      "riscv-international",
      "openhw-foundation",
      "chips-alliance",
      "fossi-foundation",
      "tiny-tapeout",
      "chipfoundry",
      "openhw-cva6",
      "opentitan",
      "ibex-cpu",
      "cheriot-ibex",
      "hazard3",
    ];
    const linkIds = new Set(resourceDirectoryLinks.map((link) => link.id));

    for (const id of misplacedIds) {
      expect(linkIds.has(id), id).toBe(false);
    }
  });
});
