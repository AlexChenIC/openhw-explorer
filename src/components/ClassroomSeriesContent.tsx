import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GraduationCap,
  Layers3,
  ListChecks,
  Lock,
  PlayCircle,
  Route,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  getFeaturedLesson,
  getLocalizedText,
  type ClassroomLesson,
  type ClassroomSeries,
} from "@/data/classrooms";

const copy = {
  en: {
    back: "Back to learning center",
    pilot: "Pilot series",
    planned: "Planned",
    ready: "Ready",
    prototype: "Prototype",
    start: "Start featured lesson",
    project: "Open CVA6 profile",
    audience: "Who this is for",
    level: "Level",
    hours: "estimated hours",
    readyLessons: "ready lessons",
    totalLessons: "planned lessons",
    curriculum: "Curriculum map",
    curriculumSubtitle:
      "Click a unit to jump to its lessons. Individual playback lives one level deeper.",
    viewUnitLessons: "View unit lessons",
    unitLessonCount: "lessons",
    lessons: "Lessons",
    lessonsSubtitle: "Lessons are grouped by unit so the path stays easy to scan.",
    minutes: "min",
    slides: "slides",
    quiz: "quiz",
    openLesson: "Open lesson",
    notReady: "Production package pending",
    sources: "Source anchors",
  },
  zh: {
    back: "返回学习中心",
    pilot: "试发布系列",
    planned: "规划中",
    ready: "已就绪",
    prototype: "原型",
    start: "开始精选样课",
    project: "打开 CVA6 项目档案",
    audience: "适合人群",
    level: "难度",
    hours: "预计小时",
    readyLessons: "节已就绪",
    totalLessons: "节规划中",
    curriculum: "课程地图",
    curriculumSubtitle: "点击 Unit 卡片可以跳到对应课程组。真正的课堂播放放在下一层单课页面。",
    viewUnitLessons: "查看本 Unit 课程",
    unitLessonCount: "节课程",
    lessons: "课程列表",
    lessonsSubtitle: "课程按 Unit 分组展示，这样整条学习路径更容易浏览。",
    minutes: "分钟",
    slides: "页 slide",
    quiz: "题 quiz",
    openLesson: "打开课程",
    notReady: "制片包待完成",
    sources: "资料锚点",
  },
} as const;

function lessonStatusLabel(status: ClassroomLesson["status"], locale: string) {
  if (locale === "zh") {
    if (status === "featured" || status === "pilot") return "可播放";
    if (status === "draft") return "原型";
    return "规划中";
  }
  if (status === "featured" || status === "pilot") return "Playable";
  if (status === "draft") return "Prototype";
  return "Planned";
}

function lessonStatusClass(status: ClassroomLesson["status"]) {
  if (status === "featured")
    return "border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]";
  if (status === "pilot")
    return "border-[var(--green)]/30 bg-[var(--green)]/10 text-[var(--green)]";
  if (status === "draft")
    return "border-[var(--orange)]/30 bg-[var(--orange)]/10 text-[var(--orange)]";
  return "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-tertiary)]";
}

type ClassroomSeriesContentProps = {
  locale: string;
  series: ClassroomSeries;
};

export function ClassroomSeriesContent({ locale, series }: ClassroomSeriesContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const featuredLesson = getFeaturedLesson(series);
  const publicLessons = series.lessons.filter((lesson) => lesson.status !== "draft");
  const playableLessons = publicLessons.filter((lesson) => lesson.classroomId);
  const lessonsByUnit = new Map(
    series.units.map((unit) => [
      unit.id,
      publicLessons.filter((lesson) => lesson.unitId === unit.id),
    ]),
  );

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/classroom"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            {t.back}
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
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
              {featuredLesson?.classroomId && (
                <Link
                  href={`/classroom/${series.id}/${featuredLesson.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-colors hover:bg-[var(--primary-dark)]"
                >
                  <PlayCircle className="h-4 w-4" />
                  {t.start}
                </Link>
              )}
              <Link
                href="/projects/cva6"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
              >
                {t.project}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  {series.lessonsReady}
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.readyLessons}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  {series.lessonsPlanned}
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.totalLessons}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  {series.estimatedHours}
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.hours}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <div className="text-2xl font-bold text-[var(--text-primary)]">
                  {playableLessons.length}
                </div>
                <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.lessons}</div>
              </div>
            </div>
            <div className="mt-5 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  {t.audience}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {getLocalizedText(series.audience, resolvedLocale)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  {t.level}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {getLocalizedText(series.level, resolvedLocale)}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.curriculum}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.curriculumSubtitle}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {series.units.map((unit) => {
              const unitLessons = lessonsByUnit.get(unit.id) ?? [];
              const unitPlayableLessons = unitLessons.filter((lesson) => lesson.classroomId);

              return (
                <a
                  key={unit.id}
                  href={`#lessons-${unit.id}`}
                  className="group block h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--card-shadow)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                      Unit {String(unit.order).padStart(2, "0")}
                    </span>
                    <Route className="h-4 w-4 text-[var(--primary)] transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(unit.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {getLocalizedText(unit.goal, resolvedLocale)}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                    <span className="text-xs font-semibold text-[var(--text-tertiary)]">
                      {unitPlayableLessons.length}/{unitLessons.length} {t.unitLessonCount}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                      {t.viewUnitLessons}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section id="lessons" className="mb-4 scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.lessons}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.lessonsSubtitle}
            </p>
          </div>
          <div className="space-y-6">
            {series.units.map((unit) => {
              const unitLessons = lessonsByUnit.get(unit.id) ?? [];

              return (
                <section
                  key={unit.id}
                  id={`lessons-${unit.id}`}
                  className="scroll-mt-28 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]"
                >
                  <div className="mb-5 flex flex-col gap-3 border-b border-[var(--border)] pb-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <span className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                        Unit {String(unit.order).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                        {getLocalizedText(unit.title, resolvedLocale)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                        {getLocalizedText(unit.goal, resolvedLocale)}
                      </p>
                    </div>
                    <div className="inline-flex h-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                      <BookOpen className="h-3.5 w-3.5" />
                      {unitLessons.length} {t.unitLessonCount}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {unitLessons.map((lesson) => {
                      const isPlayable = Boolean(lesson.classroomId);
                      return (
                        <article
                          key={lesson.id}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                              <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${lessonStatusClass(
                                    lesson.status,
                                  )}`}
                                >
                                  {lessonStatusLabel(lesson.status, resolvedLocale)}
                                </span>
                                <span className="rounded-md bg-[var(--bg-card)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                                  {lesson.order > 0
                                    ? `L${String(lesson.order).padStart(2, "0")}`
                                    : "LAB"}
                                </span>
                              </div>
                              <h4 className="text-xl font-semibold leading-snug text-[var(--text-primary)]">
                                {getLocalizedText(lesson.title, resolvedLocale)}
                              </h4>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                                {getLocalizedText(lesson.summary, resolvedLocale)}
                              </p>
                              <p className="mt-3 text-xs font-medium text-[var(--text-tertiary)]">
                                {t.sources}: {lesson.sourceRefs.join(" · ")}
                              </p>
                            </div>
                            <div className="flex min-w-full flex-col gap-3 lg:min-w-[280px]">
                              <div className="grid grid-cols-3 gap-2 text-xs text-[var(--text-tertiary)]">
                                <span className="inline-flex items-center gap-1">
                                  <Clock3 className="h-3.5 w-3.5" />
                                  {lesson.durationMinutes} {t.minutes}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Layers3 className="h-3.5 w-3.5" />
                                  {lesson.slideCount} {t.slides}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <ListChecks className="h-3.5 w-3.5" />
                                  {lesson.quizCount} {t.quiz}
                                </span>
                              </div>
                              {isPlayable ? (
                                <Link
                                  href={`/classroom/${series.id}/${lesson.id}`}
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
                                >
                                  {t.openLesson}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              ) : (
                                <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-semibold text-[var(--text-tertiary)]">
                                  <Lock className="h-4 w-4" />
                                  {t.notReady}
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
