import { describe, expect, it } from "vitest";
import { filterProjects, localizeProject, projects } from "@/data/projects";
import { filterConfig, quickFilterTags } from "@/data/filters";
import { getProjectKnowledge } from "@/data/knowledge";
import classroom from "@/data/published-classrooms/openhw-overview-industrial-adoption-en.json";
import curatedNews from "@/data/curated-news.json";

const projectIds = new Set(projects.map((p) => p.id));

describe("projects data integrity", () => {
  it("has unique ids", () => {
    expect(projectIds.size).toBe(projects.length);
  });

  it("every project has the required fields", () => {
    for (const project of projects) {
      expect(project.id, project.id).toBeTruthy();
      expect(project.name, project.id).toBeTruthy();
      expect(project.description, project.id).toBeTruthy();
      expect(project.category.length, project.id).toBeGreaterThan(0);
      expect(project.status, project.id).toBeTruthy();
      expect(project.statusSource, project.id).toBeTruthy();
      expect(project.statusSourceUrl, project.id).toMatch(/^https:\/\//);
      expect(project.github, project.id).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it("relatedProjects only reference existing ids", () => {
    for (const project of projects) {
      for (const relatedId of project.relatedProjects || []) {
        expect(projectIds.has(relatedId), `${project.id} -> ${relatedId}`).toBe(true);
      }
    }
  });

  it("every reviewed profile drives a non-baseline description", () => {
    for (const project of projects) {
      expect(project.launchStage, project.id).toBe("curated");
    }
  });

  it("provides Chinese, source-profile-backed detail content for every project", () => {
    for (const project of projects) {
      const localized = localizeProject(project, "zh");
      expect(localized.description, project.id).toBeTruthy();
      expect(localized.description, project.id).not.toBe(project.description);
      expect(localized.keyFacts, project.id).toEqual(project.keyFactsZh);
      expect(localized.keyFacts?.length, project.id).toBeGreaterThan(0);
    }
  });
});

describe("no dead filter options", () => {
  it("every quick tag matches at least one project", () => {
    for (const tag of quickFilterTags) {
      if (tag.id === "all") continue;
      const count = filterProjects({ category: tag.id }).length;
      expect(count, `quick tag '${tag.id}'`).toBeGreaterThan(0);
    }
  });

  it("every architecture/focus option matches its applicable project category", () => {
    for (const coreType of filterConfig.coreTypes) {
      const category = coreType.id === "fault-tolerant" ? "soc" : "core";
      const count = filterProjects({ category, coreType: coreType.id }).length;
      expect(count, `core type '${coreType.id}'`).toBeGreaterThan(0);
    }
  });

  it("keeps security, functional-safety mechanisms, and architecture class distinct", () => {
    expect(
      filterProjects({ category: "core", coreType: "embedded-mcu" }).map((p) => p.id),
    ).toContain("cva6");
    expect(
      filterProjects({ category: "core", coreType: "security-focused" }).map((p) => p.id),
    ).toContain("cv32e40s");
    expect(
      filterProjects({ category: "soc", coreType: "fault-tolerant" }).map((p) => p.id),
    ).toContain("cva6-safe");

    const cva6Safe = projects.find((project) => project.id === "cva6-safe");
    expect(cva6Safe?.tags).not.toContain("ISO 26262");
    expect(cva6Safe?.tags).not.toContain("Automotive");
  });

  it("every verification type matches at least one verification project", () => {
    for (const verificationType of filterConfig.verificationTypes) {
      const count = filterProjects({
        category: "verification",
        verificationType: verificationType.id,
      }).length;
      expect(count, `verification type '${verificationType.id}'`).toBeGreaterThan(0);
    }
  });

  it("every role matches at least one project", () => {
    for (const role of filterConfig.roles) {
      const count = filterProjects({ role: role.id }).length;
      expect(count, `role '${role.id}'`).toBeGreaterThan(0);
    }
  });
});

describe("source-backed content boundaries", () => {
  it("separates adoption claims from contributors and lineage", () => {
    const cva5 = getProjectKnowledge("cva5");
    expect(cva5?.industryAdoption || []).toHaveLength(0);
    expect(cva5?.projectInvolvement?.[0]?.kind).toBe("origin");

    const coreVMcu = getProjectKnowledge("core-v-mcu");
    expect(coreVMcu?.industryAdoption?.[0]?.entity).toBe("QuickLogic Corporation");
  });

  it("gives every OpenHW foundations source anchor a public context URL", () => {
    const anchors = classroom.scenes.flatMap((scene) => scene.content.sourceAnchors || []);
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      expect(anchor.url, anchor.id).toMatch(/^https:\/\//);
      expect(anchor.locator, anchor.id).toMatch(/\.pdf#page=\d+$/);
    }
  });

  it("keeps reviewed GitHub release dates aligned with their official releases", () => {
    const expectedDates = new Map([
      ["https://github.com/ucb-bar/gemmini/releases/tag/v0.7.1", "2023-05-22T23:35:24Z"],
      ["https://github.com/openhwgroup/cva6/releases/tag/cv32a60x-v6.0.0", "2025-04-23T13:49:12Z"],
    ]);

    for (const [url, expectedDate] of expectedDates) {
      const item = curatedNews.items.find((candidate) => candidate.url === url);
      expect(item?.addedAt, url).toBe(expectedDate);
    }
  });
});
