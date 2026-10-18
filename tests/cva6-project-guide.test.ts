import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { projectGuides } from "@/data/classroom-project-guides";
import { getPublishedClassroom, getPublishedClassroomIds } from "@/data/published-classrooms";
import { localeHref } from "@/lib/locale-href";
import { narrationCueAt, resolveReviewScene } from "@/lib/visual-course";

const ids = [
  "s01",
  "s02",
  "s03",
  "s04",
  "s05",
  "s06",
  "s07",
  "s08",
  "s09",
  "s10",
  "s12",
  "s13",
  "s14",
];
const manifest = JSON.parse(
  readFileSync("docs/course-guides/cva6/20261018/release-manifest.json", "utf8"),
);

describe("Approved bilingual CVA6 overview", () => {
  it("retains the two stable public IDs and one complete overview", () => {
    expect(projectGuides.lessons).toHaveLength(1);
    expect(projectGuides.lessons[0].status).toBe("published");
    expect(projectGuides.lessons[0].slideCount).toBe(13);
    expect(projectGuides.lessons[0].durationMinutesByLocale).toEqual({ zh: 15, en: 21 });
    expect(
      getPublishedClassroomIds().filter((id) => id.startsWith("cva6-project-intro-")),
    ).toHaveLength(2);
    expect(localeHref("/classroom-player/cva6-project-intro-en", "", "", "zh")).toBe(
      "/classroom-player/cva6-project-intro-zh",
    );
  });
  for (const locale of ["en", "zh"]) {
    it(`${locale} has playable narration, matching captions, visual sources and native activities`, () => {
      const id = `cva6-project-intro-${locale}`;
      const course = getPublishedClassroom(id);
      expect(course.stage.releaseStage).toBe("published");
      expect(course.scenes.map((s) => s.id)).toEqual(ids);
      expect(course.scenes.filter((s) => s.type === "interactive")).toHaveLength(2);
      expect(course.scenes.flatMap((s) => s.content.assets ?? [])).toHaveLength(12);
      for (const scene of course.scenes) {
        expect(scene.content.sourceAnchors?.length).toBeGreaterThan(0);
        const speeches = scene.actions?.filter((a) => a.type === "speech") ?? [];
        expect(speeches).toHaveLength(1);
        const action = speeches[0];
        expect(action.text!.length).toBeGreaterThanOrEqual(80);
        expect(action.text!.length).toBeLessThanOrEqual(1600);
        for (const url of [
          action.audioUrl!,
          action.captionUrl!,
          ...(scene.content.assets ?? []).map((a) => a.src),
        ]) {
          expect(url).toMatch(new RegExp(`^/classroom-assets/${id}/20261018/`));
          expect(existsSync(join("public", url))).toBe(true);
        }
        expect(
          action
            .captionCues!.map((c) => c.text)
            .join("")
            .replace(/\s/g, ""),
        ).toBe(action.text!.replace(/\s/g, ""));
        expect(readFileSync(join("public", action.captionUrl!), "utf8")).toMatch(/^WEBVTT/);
      }
      const questions = course.scenes.flatMap((s) => s.content.questions ?? []);
      expect(questions).toHaveLength(4);
      for (const q of questions) {
        expect(q.options).toHaveLength(4);
        expect(q.analysis).toBeTruthy();
        expect(Object.keys(q.optionFeedback!)).toHaveLength(4);
        expect(q.answer.every((a) => q.options.some((o) => o.value === a))).toBe(true);
      }
      expect(course.scenes.find((s) => s.id === "s04")!.content.widgetHtml).toContain(
        "81245a47fad8fe1a5d562d953ef2662e099def76",
      );
      expect(course.scenes.find((s) => s.id === "s06")!.content.widgetHtml).toContain("x5 =");
      expect(JSON.stringify(course)).not.toMatch(
        /\/Users\/|127\.0\.0\.1|localhost|\/api\/classroom-media|reviewable-local-draft/,
      );
    });
  }
  it("binds every public media file and package to the exported release digests", () => {
    expect(manifest.assets).toHaveLength(76);
    for (const asset of manifest.assets) {
      expect(
        createHash("sha256")
          .update(readFileSync(join("public", asset.path)))
          .digest("hex"),
      ).toBe(asset.sha256);
    }
    for (const p of manifest.packages) {
      expect(
        createHash("sha256")
          .update(readFileSync(`src/data/published-classrooms/${p.id}.json`))
          .digest("hex"),
      ).toBe(p.packageSha256);
    }
  });
  it("aligns bilingual scene structure, source URLs and answers", () => {
    const en = getPublishedClassroom("cva6-project-intro-en");
    const zh = getPublishedClassroom("cva6-project-intro-zh");
    const structure = (c: typeof en) =>
      c.scenes.map((s) => [s.id, s.type, s.content.sourceAnchors?.map((a) => a.url)]);
    expect(structure(en)).toEqual(structure(zh));
    expect(en.scenes.flatMap((s) => s.content.questions ?? []).map((q) => q.answer)).toEqual(
      zh.scenes.flatMap((s) => s.content.questions ?? []).map((q) => q.answer),
    );
  });
  it("resolves restored scenes and caption boundaries without stale indices", () => {
    expect(resolveReviewScene(ids, "#s14", "s01")).toBe(12);
    expect(resolveReviewScene(ids, "#invalid")).toBe(0);
    const cues = [
      { start: 0, end: 1, text: "a" },
      { start: 1, end: 2, text: "b" },
    ];
    expect(narrationCueAt(cues, 1)).toBe("b");
    expect(narrationCueAt(cues, 2)).toBe("");
  });
});
