import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { industryCompanies, industrySegments } from "@/data/industry-landscape";
import { ecosystemEntries } from "@/data/ecosystem";

describe("industry landscape", () => {
  it("keeps a focused, source-checkable company map", () => {
    expect(industryCompanies.length).toBeGreaterThanOrEqual(30);
    expect(industryCompanies.length).toBeLessThanOrEqual(40);
    expect(new Set(industryCompanies.map((company) => company.id)).size).toBe(
      industryCompanies.length,
    );
    expect(new Set(industryCompanies.map((company) => company.url)).size).toBe(
      industryCompanies.length,
    );

    for (const company of industryCompanies) {
      expect(company.url, company.id).toMatch(/^https:\/\//);
      expect(company.mark, company.id).toMatch(/^[A-Z0-9]{2,3}$/);
      expect(company.logo, company.id).toMatch(/^\/industry\/logos\//);
      expect(existsSync(join(process.cwd(), "public", company.logo)), company.id).toBe(true);
      expect(company.entityType.en, company.id).toBeTruthy();
      expect(company.entityType.zh, company.id).toBeTruthy();
      expect(company.summary.en, company.id).toBeTruthy();
      expect(company.summary.zh, company.id).toBeTruthy();
      expect(company.focus.length, company.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses every declared industry segment", () => {
    const segmentIds = new Set(industrySegments.map((segment) => segment.id));

    for (const segment of industrySegments) {
      expect(
        industryCompanies.some((company) => company.segment === segment.id),
        segment.id,
      ).toBe(true);
    }

    for (const company of industryCompanies) {
      expect(segmentIds.has(company.segment), company.id).toBe(true);
    }
  });

  it("does not mix commercial companies into the open ecosystem directory", () => {
    const ecosystemIds = new Set(ecosystemEntries.map((entry) => entry.id));
    const commercialOnlyIds = [
      "sifive",
      "andes-technology",
      "codasip",
      "mips",
      "akeana",
      "semidynamics",
      "nuclei-system-technology",
      "tenstorrent",
      "ventana-micro-systems",
      "starfive",
      "spacemit",
      "openchip",
      "synopsys",
      "cadence",
      "siemens-eda",
    ];

    for (const id of commercialOnlyIds) {
      expect(ecosystemIds.has(id), id).toBe(false);
    }
  });
});
