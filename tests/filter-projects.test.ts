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

  it("search combined with category filter stays within category", () => {
    const results = filterProjects({ category: "verification", search: "uvm" });
    for (const project of results) {
      expect(project.category).toContain("verification");
    }
  });
});
