import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "@/data/projects";
import { filterConfig, quickFilterTags } from "@/data/filters";

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
});

describe("no dead filter options", () => {
  it("every quick tag matches at least one project", () => {
    for (const tag of quickFilterTags) {
      if (tag.id === "all") continue;
      const count = filterProjects({ category: tag.id }).length;
      expect(count, `quick tag '${tag.id}'`).toBeGreaterThan(0);
    }
  });

  it("every core type matches at least one core project", () => {
    for (const coreType of filterConfig.coreTypes) {
      const count = filterProjects({ category: "core", coreType: coreType.id }).length;
      expect(count, `core type '${coreType.id}'`).toBeGreaterThan(0);
    }
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
