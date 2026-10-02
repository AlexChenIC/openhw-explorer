import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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
      expect(classroom.scenes.map((s) => s.order)).toEqual(Array.from({ length: 12 }, (_, i) => i));
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
          expect(new URL(anchor.url!).hostname).toMatch(
            /^(github\.com|docs\.openhwgroup\.org|www\.linkedin\.com|riscv-europe\.org|iis-people\.ee\.ethz\.ch)$/,
          );
          expect(anchor.locator).toBeTruthy();
          expect(anchor.claimSupported).toBeTruthy();
        }
        const speeches = scene.actions?.filter((a) => a.type === "speech") || [];
        expect(speeches).toHaveLength(1);
        for (const action of speeches) {
          expect(action.text!.length).toBeGreaterThanOrEqual(180);
          expect(action.text!.length).toBeLessThanOrEqual(800);
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
      expect(config.content.html).toContain("81245a47fad8fe1a5d562d953ef2662e099def76");
      const mediaDir = join(process.cwd(), "public/classroom-assets", id);
      expect(readdirSync(join(mediaDir, "audio")).filter((f) => f.endsWith(".mp3"))).toHaveLength(
        12,
      );
      expect(
        readdirSync(join(mediaDir, "subtitles")).filter((f) => f.endsWith(".vtt")),
      ).toHaveLength(12);
      const evidence = classroom.scenes.find((s) => s.id === "scene-cva6-intro-evidence")!;
      expect(evidence.type).toBe("interactive");
      expect(evidence.content.html).toContain('aria-live="polite"');
      expect(evidence.content.sourceAnchors?.some((a) => a.id === "cv32a60x-trl5")).toBe(true);
      const release = classroom.scenes.find((s) => s.id === "scene-cva6-intro-release")!;
      expect(JSON.stringify(release.content)).toContain("cv32a60x-v6.0.0");
      expect(JSON.stringify(release.content)).toContain("b1f80bd7cff3");
      const applications = classroom.scenes.find((s) => s.id === "scene-cva6-intro-applications")!;
      expect(applications.content.sourceAnchors?.map((a) => a.id)).toEqual([
        "bosch-tristan",
        "thales-astral",
        "eth-basilisk",
        "pulp-occamy",
      ]);
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
