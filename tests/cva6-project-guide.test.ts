import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projectGuides } from "@/data/classroom-project-guides";
import { hasPublishedLesson, getClassroomIdForLocale } from "@/data/classrooms";
import { getPublishedClassroom, getPublishedClassroomIds } from "@/data/published-classrooms";
import { localeHref } from "@/lib/locale-href";

describe("CVA6 project guide demo", () => {
  it("exposes just one bilingual demo, not retired prototypes or a completed series", () => {
    expect(projectGuides.lessons).toHaveLength(1);
    const lesson = projectGuides.lessons[0];
    expect(lesson.status).toBe("demo");
    expect(hasPublishedLesson(lesson)).toBe(true);
    expect(hasPublishedLesson({ ...lesson, role: "prototype" })).toBe(false);
    expect(hasPublishedLesson({ ...lesson, status: "in-production" })).toBe(false);
    expect(
      getPublishedClassroomIds().filter((id) => id.startsWith("cva6-project-intro-")),
    ).toHaveLength(2);
    expect(localeHref("/classroom-player/cva6-project-intro-en", "", "", "zh")).toBe(
      "/classroom-player/cva6-project-intro-zh",
    );
  });

  for (const locale of ["en", "zh"] as const) {
    it(`keeps ${locale} narration, captions, questions and public sources complete`, () => {
      const lesson = projectGuides.lessons[0];
      const id = getClassroomIdForLocale(lesson, locale)!;
      const classroom = getPublishedClassroom(id);
      expect(classroom.stage.releaseStage).toBe("demo");
      expect(classroom.stage.language).toBe(locale === "zh" ? "zh-CN" : "en-US");
      expect(classroom.scenes).toHaveLength(lesson.slideCount);
      expect(classroom.scenes.map((s) => s.order)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      expect(new Set(classroom.scenes.map((s) => s.id)).size).toBe(lesson.slideCount);
      const questions = classroom.scenes.flatMap((s) => s.content.questions || []);
      expect(questions).toHaveLength(lesson.quizCount);
      for (const question of questions) {
        expect(question.options).toHaveLength(4);
        expect(question.answer.every((a) => question.options.some((o) => o.value === a))).toBe(
          true,
        );
        expect(question.analysis).toBeTruthy();
      }
      for (const scene of classroom.scenes) {
        expect(scene.content.sourceAnchors?.length).toBeGreaterThan(0);
        for (const anchor of scene.content.sourceAnchors || []) {
          expect(anchor.url).toMatch(/^https:\/\/(github\.com|openhwgroup\.github\.io)\//);
          expect(anchor.locator).toBeTruthy();
          expect(anchor.claimSupported).toBeTruthy();
        }
        const speeches = scene.actions?.filter((a) => a.type === "speech") || [];
        expect(speeches).toHaveLength(1);
        for (const action of speeches) {
          expect(action.text!.length).toBeGreaterThanOrEqual(180);
          expect(action.text!.length).toBeLessThanOrEqual(520);
          const audio = join(
            process.cwd(),
            "public/classroom-assets",
            id,
            "audio",
            action.audioUrl!.split("/").pop()!,
          );
          expect(existsSync(audio)).toBe(true);
          expect(action.captionUrl).toMatch(new RegExp(`^/classroom-assets/${id}/subtitles/`));
          expect(readFileSync(join(process.cwd(), "public", action.captionUrl!), "utf8")).toMatch(
            /^WEBVTT/,
          );
        }
      }
      const config = classroom.scenes.find((s) => s.id === "scene-cva6-intro-configurations")!;
      expect(config.type).toBe("interactive");
      for (const name of ["CV32A60X", "CV32A65X", "cv64a6_imafdc_sv39_config_pkg.sv"])
        expect(config.content.html).toContain(name);
      expect(config.content.html).toContain("49b5fa9e2f5a803cd52f8430d8e8818089e68865");
      expect(JSON.stringify(classroom)).not.toMatch(
        /drive\.google|docs\.google|localhost|127\.0\.0\.1/,
      );
    });
  }

  it("aligns both language editions on scene order, sources and correct answers", () => {
    const en = getPublishedClassroom("cva6-project-intro-en");
    const zh = getPublishedClassroom("cva6-project-intro-zh");
    expect(en.scenes.map((s) => [s.id, s.type, s.content.sourceAnchors])).toEqual(
      zh.scenes.map((s) => [s.id, s.type, s.content.sourceAnchors]),
    );
    expect(en.scenes.flatMap((s) => s.content.questions || []).map((q) => q.answer)).toEqual(
      zh.scenes.flatMap((s) => s.content.questions || []).map((q) => q.answer),
    );
  });
});
