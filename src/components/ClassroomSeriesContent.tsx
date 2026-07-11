import {
  ArrowRight,
  BookOpen,
  Clock3,
  ExternalLink,
  GraduationCap,
  Layers3,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  getFeaturedLesson,
  getLocalizedText,
  hasPublishedLesson,
  type ClassroomSeries,
} from "@/data/classrooms";

const copy = {
  en: {
    back: "Back to learning center",
    pilot: "Public prototype",
    start: "Start sample lesson",
    project: "Open CVA6 profile",
    resources: "Browse OpenHW resources",
    audience: "Who this is for",
    level: "Level",
    readyLessons: "sample lessons",
    plannedUnits: "planned units",
    language: "sample language",
    bilingual: "EN / 中文",
    english: "English",
    status: "Prototype",
    statusLabel: "publication status",
    curriculum: "Planned course roadmap",
    curriculumSubtitle:
      "The roadmap shows the intended learning sequence. Only units with a published sample are currently playable.",
    plannedUnit: "Planned unit",
    sampleAvailable: "Sample available",
    unitLessonCount: "sample lessons",
    lessons: "Available sample",
    lessonsSubtitle:
      "This prototype remains online so the interaction, narration, and teaching format can be evaluated before the course is rebuilt.",
    minutes: "min",
    slides: "slides",
    quiz: "quiz",
    openLesson: "Open sample lesson",
    sources: "Source anchors",
  },
  zh: {
    back: "返回学习中心",
    pilot: "公开原型",
    start: "开始体验样课",
    project: "打开 CVA6 项目档案",
    resources: "浏览 OpenHW 技术资料",
    audience: "适合人群",
    level: "难度",
    readyLessons: "节样课",
    plannedUnits: "个规划 Unit",
    language: "样课语言",
    bilingual: "EN / 中文",
    english: "英文",
    status: "原型阶段",
    statusLabel: "发布状态",
    curriculum: "计划中的课程路线",
    curriculumSubtitle: "这里展示计划中的学习顺序。目前只有带有样课标记的 Unit 可以进入课堂体验。",
    plannedUnit: "规划 Unit",
    sampleAvailable: "已有样课",
    unitLessonCount: "节样课",
    lessons: "可体验样课",
    lessonsSubtitle: "保留这节原型课，是为了在正式重制前直观评估交互、语音和教学呈现方式。",
    minutes: "分钟",
    slides: "页",
    quiz: "题",
    openLesson: "打开样课",
    sources: "资料锚点",
  },
} as const;

type ClassroomSeriesContentProps = {
  locale: string;
  series: ClassroomSeries;
};

export function ClassroomSeriesContent({ locale, series }: ClassroomSeriesContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const featuredLesson = getFeaturedLesson(series);
  const playableLessons = series.lessons.filter(hasPublishedLesson);
  const lessonsByUnit = new Map(
    series.units.map((unit) => [
      unit.id,
      playableLessons.filter((lesson) => lesson.unitId === unit.id),
    ]),
  );
  const unitsWithLessons = series.units.filter((unit) => (lessonsByUnit.get(unit.id) ?? []).length);
  const secondaryHref = series.projectId === "cva6" ? "/projects/cva6" : "/resources";
  const secondaryLabel = series.projectId === "cva6" ? t.project : t.resources;

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Link
          href="/classroom"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          {t.back}
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--orange)]/25 bg-[var(--orange)]/10 px-3 py-1 text-xs font-semibold text-[var(--orange)]">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.pilot}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {getLocalizedText(series.title, resolvedLocale)}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
              {getLocalizedText(series.subtitle, resolvedLocale)}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {getLocalizedText(series.description, resolvedLocale)}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {featuredLesson && hasPublishedLesson(featuredLesson) && (
                <Link
                  href={`/classroom/${series.id}/${featuredLesson.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
                >
                  <PlayCircle className="h-4 w-4" />
                  {t.start}
                </Link>
              )}
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
              >
                {secondaryLabel}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="grid grid-cols-2 gap-3">
              {[
                [series.lessonsReady, t.readyLessons],
                [series.units.length, t.plannedUnits],
                [series.id === "cva6-from-zero" ? t.bilingual : t.english, t.language],
                [t.status, t.statusLabel],
              ].map(([value, label]) => (
                <div key={String(label)} className="border-t border-[var(--border)] pt-3">
                  <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-4 border-t border-[var(--border)] pt-5">
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--text-tertiary)]">{t.audience}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {getLocalizedText(series.audience, resolvedLocale)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--text-tertiary)]">{t.level}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {getLocalizedText(series.level, resolvedLocale)}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.curriculum}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {t.curriculumSubtitle}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {series.units.map((unit) => {
              const unitLessons = lessonsByUnit.get(unit.id) ?? [];
              const content = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                      Unit {String(unit.order).padStart(2, "0")}
                    </span>
                    <span className={`text-xs font-semibold ${unitLessons.length ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"}`}>
                      {unitLessons.length ? t.sampleAvailable : t.plannedUnit}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(unit.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {getLocalizedText(unit.goal, resolvedLocale)}
                  </p>
                  {unitLessons.length > 0 && (
                    <div className="mt-5 inline-flex items-center gap-2 border-t border-[var(--border)] pt-4 text-sm font-semibold text-[var(--primary)]">
                      {unitLessons.length} {t.unitLessonCount}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </>
              );

              return unitLessons.length ? (
                <a
                  key={unit.id}
                  href={`#lessons-${unit.id}`}
                  className="block rounded-md border border-[var(--primary)]/35 bg-[var(--bg-card)] p-5 transition hover:border-[var(--primary)]"
                >
                  {content}
                </a>
              ) : (
                <article key={unit.id} className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5">
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        <section id="lessons" className="mb-4 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.lessons}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {t.lessonsSubtitle}
          </p>
          <div className="mt-6 space-y-6">
            {unitsWithLessons.map((unit) => {
              const unitLessons = lessonsByUnit.get(unit.id) ?? [];
              return (
                <section
                  key={unit.id}
                  id={`lessons-${unit.id}`}
                  className="scroll-mt-28 rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]"
                >
                  <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
                    <div>
                      <span className="text-xs font-semibold text-[var(--text-tertiary)]">
                        Unit {String(unit.order).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                        {getLocalizedText(unit.title, resolvedLocale)}
                      </h3>
                    </div>
                    <BookOpen className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  {unitLessons.map((lesson) => (
                    <article key={lesson.id} className="rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                          <span className="inline-flex rounded-full border border-[var(--orange)]/25 bg-[var(--orange)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--orange)]">
                            {t.pilot}
                          </span>
                          <h4 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                            {getLocalizedText(lesson.title, resolvedLocale)}
                          </h4>
                          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                            {getLocalizedText(lesson.summary, resolvedLocale)}
                          </p>
                          <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                            {t.sources}: {lesson.sourceRefs.join(" · ")}
                          </p>
                        </div>
                        <div className="min-w-full lg:min-w-[280px]">
                          <div className="grid grid-cols-3 gap-2 text-xs text-[var(--text-tertiary)]">
                            <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{lesson.durationMinutes} {t.minutes}</span>
                            <span className="inline-flex items-center gap-1"><Layers3 className="h-3.5 w-3.5" />{lesson.slideCount} {t.slides}</span>
                            <span className="inline-flex items-center gap-1"><ListChecks className="h-3.5 w-3.5" />{lesson.quizCount} {t.quiz}</span>
                          </div>
                          <Link
                            href={`/classroom/${series.id}/${lesson.id}`}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
                          >
                            {t.openLesson}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
