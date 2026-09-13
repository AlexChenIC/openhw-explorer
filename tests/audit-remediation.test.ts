import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { localeHref } from "@/lib/locale-href";
import { classroomRoutes } from "@/data/classroom-routes";
import { publishedNewsletterUsername } from "@/lib/newsletter";
import { newsDateLabel } from "@/lib/news-dates";
import { getPublishedClassroom, getPublishedClassroomIds } from "@/data/published-classrooms";
import { classroomSeries, hasPublishedLesson } from "@/data/classrooms";
import { industryCompanies } from "@/data/industry-landscape";
import { ecosystemEntries } from "@/data/ecosystem";
import { pdkDetails } from "@/data/pdk-details";
import digest from "@/data/news-digest.json";
import curated from "@/data/curated-news.json";

describe("September audit release gates", () => {
  it("preserves filters and fragments in both language directions", () => {
    expect(Object.values(classroomRoutes).flatMap(Object.values).sort()).toEqual(getPublishedClassroomIds().sort());
    expect(localeHref("/", "?cat=tools&q=compiler", "#projects", "zh")).toBe("/?cat=tools&q=compiler#projects");
    for (const [from, to] of [["en", "zh"], ["zh", "en"]] as const) {
      for (const course of ["core-v-names", "foundation"]) {
        expect(localeHref("/classroom-player/openhw-essentials-" + course + "-" + from, "?scene=2", "#notes", to))
          .toBe("/classroom-player/openhw-essentials-" + course + "-" + to + "?scene=2#notes");
      }
    }
  });
  it("never enables email collection from an environment username alone", () => {
    expect(publishedNewsletterUsername("example")).toBeUndefined();
  });
  it("makes unknown source dates explicit, without substituting today", () => {
    expect(newsDateLabel({ publishedAt: "", addedAt: "2026-06-09" }, "en")).toContain("Added");
    expect(newsDateLabel({ publishedAt: "", addedAt: "2026-06-09" }, "zh")).toContain("收录于");
    expect(digest.items.find((item) => item.url === "https://arxiv.org/html/2605.10860v2")?.publishedAt).toBe("2026-05-22");
  });
  it("preserves the two reviewed bilingual courses and their subtitle files", () => {
    const reviewedIds = getPublishedClassroomIds().filter((id) => id.startsWith("openhw-essentials-"));
    expect(reviewedIds).toHaveLength(4);
    let tracks = 0;
    for (const id of reviewedIds) {
      const classroom = getPublishedClassroom(id);
      for (const scene of classroom.scenes) for (const action of scene.actions || []) {
        if (!action.audioUrl) continue;
        expect(action.captionUrl).toMatch(/^\/classroom-assets\//);
        const filename = join(process.cwd(), "public", action.captionUrl!);
        expect(existsSync(filename)).toBe(true);
        expect(readFileSync(filename, "utf8")).toMatch(/^WEBVTT/);
        tracks++;
      }
      if (id.includes("core-v-names")) {
        const rules = classroom.scenes.find((scene) => scene.id === "scene-core-v-names-rules")!;
        const decoder = classroom.scenes.find((scene) => scene.id === "scene-core-v-names-decoder")!;
        expect(JSON.stringify(rules)).toContain("XLEN");
        expect(JSON.stringify(decoder)).toContain("XLEN");
        expect(JSON.stringify(decoder)).not.toContain("64-bit instruction length.");
        expect(classroom.scenes.flatMap((scene) => scene.content.questions || [])).toHaveLength(5);
      }
    }
    expect(tracks).toBe(38);
    for (const lesson of classroomSeries.flatMap((series) => series.lessons)) {
      if (lesson.role !== "catalog") expect(hasPublishedLesson(lesson)).toBe(false);
    }
    for (const id of ["openhw-cva6-u01-l01-what-is-cva6-en", "openhw-cva6-u01-l01-what-is-cva6-zh", "openhw-overview-industrial-adoption-en"]) {
      expect(getPublishedClassroom(id)).toBeUndefined();
      expect(existsSync(join(process.cwd(), "public/classroom-assets", id))).toBe(false);
    }
  });
  it("retains entire editorial summaries and associates known reposts", () => {
    for (const item of digest.items) {
      expect(item.summary).toBe(curated.items.find((source) => source.url === item.url)?.summary);
      expect(item.summary).not.toContain("HDR-DDR at 25 MHz");
    }
    expect(digest.items).toHaveLength(curated.items.length - 2);
    expect(digest.items.filter((item) => "relatedSources" in item)).toHaveLength(2);
  });
  it("keeps current supplier claims and headquarters evidence separate", () => {
    expect(industryCompanies.find((item) => item.id === "quintauris")?.segment).toBe("design-enablement");
    expect(industryCompanies.find((item) => item.id === "renesas")?.summary.en).toContain("Andes AX45MP");
    expect(industryCompanies.some((item) => ["rivos", "oxmiq"].includes(item.id))).toBe(false);
    for (const item of industryCompanies) {
      if (item.headquartersCountry) expect(item.headquartersSource).toMatch(/^https:\/\//);
      else expect(item.regionGroup).toBe("unknown");
    }
  });
  it("gives every PDK its own applicability and source details", () => {
    const pdks = ecosystemEntries.filter((entry) => entry.category === "pdk");
    expect(pdks).toHaveLength(8);
    for (const entry of pdks) {
      const details = pdkDetails[entry.id];
      expect(details.sources.length).toBeGreaterThan(0);
      for (const key of ["contents", "license", "tools", "manufacturing"] as const) {
        expect(details[key].en).toBeTruthy();
        expect(details[key].zh).toBeTruthy();
      }
    }
  });
});
