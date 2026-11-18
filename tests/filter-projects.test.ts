import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "@/data/projects";

describe("filterProjects", () => {
  it("returns all projects with no filters", () => {
    expect(filterProjects({})).toHaveLength(projects.length);
  });

  it("filters by category", () => {
    const cores = filterProjects({ category: "core" });
    expect(cores.length).toBeGreaterThan(0);
    for (const project of cores) {
      expect(project.category).toContain("core");
    }
  });

  it("treats category 'all' as no category filter", () => {
    expect(filterProjects({ category: "all" })).toHaveLength(projects.length);
  });

  it("combines category and coreType", () => {
    const results = filterProjects({ category: "core", coreType: "embedded-mcu" });
    expect(results.length).toBeGreaterThan(0);
    for (const project of results) {
      expect(project.category).toContain("core");
      expect(project.coreType).toContain("embedded-mcu");
    }
  });

  it("combines category and verificationType", () => {
    const results = filterProjects({
      category: "verification",
      verificationType: "formal-verification",
    });
    expect(results.length).toBeGreaterThan(0);
    for (const project of results) {
      expect(project.verificationType).toContain("formal-verification");
    }
  });

  it("role 'browsing' matches everything", () => {
    expect(filterProjects({ role: "browsing" })).toHaveLength(projects.length);
  });

  it("filters by a specific role", () => {
    const results = filterProjects({ role: "researcher" });
    expect(results.length).toBeGreaterThan(0);
    for (const project of results) {
      expect(project.suitableFor).toContain("researcher");
    }
  });

  it("fuzzy search finds CVA6 by name", () => {
    const results = filterProjects({ search: "cva6" });
    expect(results.map((p) => p.id)).toContain("cva6");
  });

  it.each([
    ["浮点", "cvfpu"],
    ["锁步", "cva6-dcls"],
    ["锁步", "cva6-safe"],
    ["验证", "core-v-verif"],
    ["双发射", "cva6"],
  ])("surfaces %s in the first page of results (%s)", (search, id) => {
    expect(filterProjects({ search }).slice(0, 12).map((p) => p.id)).toContain(id);
  });

  it("keeps a Chinese search within the selected category", () => {
    const ids = filterProjects({ category: "verification", search: "浮点" }).map((p) => p.id);
    expect(ids).toContain("cvfpu-uvm");
    expect(ids).not.toContain("cvfpu");
  });

  it("does not mistake instruction issue for dual issue in Chinese", () => {
    expect(filterProjects({ search: "双发射" }).map((p) => p.id)).not.toContain("core-v-xif");
  });

  it("puts an exact repository ID first even when related projects mention it", () => {
    expect(filterProjects({ search: "  CVFPU  " })[0]?.id).toBe("cvfpu");
    expect(filterProjects({ search: "core-v-verif" })[0]?.id).toBe("core-v-verif");
  });

  it("includes the embedded SoC itself without treating its board as processor RTL", () => {
    const ids = filterProjects({ category: "soc", coreType: "embedded-mcu" }).map((p) => p.id);
    expect(ids).toContain("core-v-mcu");
    expect(ids).not.toContain("core-v-mcu-devkit");
  });

  it("includes both lockstep platforms without conflating security or maturity", () => {
    const matches = filterProjects({ category: "soc", coreType: "fault-tolerant" });
    expect(matches.map((p) => p.id)).toEqual(expect.arrayContaining(["cva6-safe", "cva6-dcls"]));
    expect(matches.map((p) => p.id)).not.toContain("cv32e40s");
    expect(matches.find((p) => p.id === "cva6-dcls")?.status).toBe("experimental");
  });

  it("search combined with category filter stays within category", () => {
    const results = filterProjects({ category: "verification", search: "uvm" });
    for (const project of results) {
      expect(project.category).toContain("verification");
    }
  });
});
