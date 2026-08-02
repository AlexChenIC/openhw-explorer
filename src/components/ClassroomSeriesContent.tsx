import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Clock3,
  ExternalLink,
  GraduationCap,
  PlayCircle,
  Route,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  getCatalogLessons,
  getLocalizedText,
  getPrototypeLessons,
  hasPublishedLesson,
  type ClassroomLessonStatus,
  type ClassroomSeries,
} from "@/data/classrooms";

const copy = {
  en: {
    back: "Learning Hub",
    releaseBadge: "Short course collection",
    developmentBadge: "Deep dive in development",
    start: "Start lesson",
    project: "Open CVA6 profile",
    resources: "Browse OpenHW resources",
    lessons: "Lessons",
    releaseNote:
      "Each lesson is published only after source, editorial, and complete audio review.",
    roadmap: "Course map",
    roadmapNote:
      "A working structure for the long-form course. Units will open as they are rebuilt and reviewed.",
    preview: "Player preview",
    previewNote: "An earlier sample for evaluating slides, narration, subtitles, and interaction.",
    openPreview: "Open preview",
    minutes: "min",
    lessonCount: "lessons",
    plannedUnits: "units",
    statuses: {
      published: "Available",
      "editorial-review": "Final review",
      "in-production": "In progress",
      planned: "Next",
      prototype: "Preview",
    },
  },
  zh: {
    back: "学习园地",
    releaseBadge: "短课系列",
    developmentBadge: "深度课程开发中",
    start: "开始学习",
    project: "打开 CVA6 项目档案",
    resources: "浏览 OpenHW 技术资料",
    lessons: "课程",
    releaseNote: "每节课完成资料、编辑和完整语音审核后才会开放。",
    roadmap: "课程地图",
    roadmapNote: "这是长课程的制作结构。每个单元在重制并审核完成后开放。",
    preview: "播放器预览",
    previewNote: "通过早期样课体验 slide、语音、字幕和互动形式。",
    openPreview: "打开预览",
    minutes: "分钟",
    lessonCount: "节课程",
    plannedUnits: "个单元",
    statuses: {
      published: "可学习",
      "editorial-review": "最终审核",
      "in-production": "制作中",
      planned: "后续制作",
      prototype: "形式预览",
    },
  },
} as const;

type ClassroomSeriesContentProps = {
  locale: string;
  series: ClassroomSeries;
};

export function ClassroomSeriesContent({ locale, series }: ClassroomSeriesContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const isReleaseSeries = series.visibility === "featured";
  const catalogLessons = getCatalogLessons(series);
  const prototypeLessons = getPrototypeLessons(series);
  const firstPublishedLesson = catalogLessons.find(
    (lesson) => lesson.status === "published" && hasPublishedLesson(lesson),
  );
  const secondaryHref = series.projectId === "cva6" ? "/projects/cva6" : "/resources";
  const secondaryLabel = series.projectId === "cva6" ? t.project : t.resources;
  const getStatusLabel = (status: ClassroomLessonStatus) => t.statuses[status];

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <Link
          href="/classroom"
          className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <section className="border-b border-[var(--border)] pb-12 pt-7 lg:pb-16">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
            <GraduationCap className="h-4 w-4" />
            {isReleaseSeries ? t.releaseBadge : t.developmentBadge}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {getLocalizedText(series.title, resolvedLocale)}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {getLocalizedText(series.subtitle, resolvedLocale)}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-tertiary)]">
            <span className="inline-flex items-center gap-2">
              <BookOpenText className="h-4 w-4" />
              {isReleaseSeries ? catalogLessons.length : series.units.length}{" "}
              {isReleaseSeries ? t.lessonCount : t.plannedUnits}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {isReleaseSeries && series.targetDurationMinutes
                ? `${series.targetDurationMinutes[0]}-${series.targetDurationMinutes[1]} ${t.minutes}`
                : getLocalizedText(series.level, resolvedLocale)}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {firstPublishedLesson && (
              <Link
                href={`/classroom/${series.id}/${firstPublishedLesson.id}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
              >
                <PlayCircle className="h-4 w-4" />
                {t.start}
              </Link>
            )}
            <Link
              href={secondaryHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--text-tertiary)]"
            >
              {secondaryLabel}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {isReleaseSeries ? (
          <section className="py-14 lg:py-20">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">{t.lessons}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.releaseNote}
            </p>
            <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {catalogLessons.map((lesson, index) => {
                const isAvailable = lesson.status === "published" && hasPublishedLesson(lesson);
                return (
                  <article
                    key={lesson.id}
                    className="grid gap-4 py-6 sm:grid-cols-[52px_1fr_auto] sm:gap-6"
                  >
                    <span className="font-mono text-sm font-semibold text-[var(--primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                        {getLocalizedText(lesson.title, resolvedLocale)}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                        {getLocalizedText(lesson.summary, resolvedLocale)}
                      </p>
                      {isAvailable && (
                        <Link
                          href={`/classroom/${series.id}/${lesson.id}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                        >
                          {t.start}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] sm:flex-col sm:items-end">
                      <span className="font-semibold text-[var(--text-secondary)]">
                        {getStatusLabel(lesson.status)}
                      </span>
                      <span>
                        {lesson.durationMinutes} {t.minutes}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="py-14 lg:py-20">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">{t.roadmap}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.roadmapNote}
            </p>
            <div className="mt-8 grid border-y border-[var(--border)] md:grid-cols-2">
              {series.units.map((unit) => (
                <article
                  key={unit.id}
                  className="border-b border-[var(--border)] py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm font-semibold text-[var(--primary)]">
                      {String(unit.order).padStart(2, "0")}
                    </span>
                    <Route className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(unit.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {getLocalizedText(unit.goal, resolvedLocale)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {prototypeLessons.length > 0 && (
          <section className="border-t border-[var(--border)] py-12">
            <p className="text-xs font-semibold uppercase text-[var(--text-tertiary)]">
              {t.preview}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.previewNote}
            </p>
            <div className="mt-5 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {prototypeLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/classroom/${series.id}/${lesson.id}`}
                  className="group flex min-h-14 items-center justify-between gap-4 py-4 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--primary)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <PlayCircle className="h-4 w-4 text-[var(--primary)]" />
                    {getLocalizedText(lesson.title, resolvedLocale)}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-xs text-[var(--text-tertiary)] group-hover:text-[var(--primary)]">
                    {t.openPreview}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
