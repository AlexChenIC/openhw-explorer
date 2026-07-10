import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  Layers3,
  LibraryBig,
  ListChecks,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  classroomSeries,
  classroomTracks,
  getFeaturedLesson,
  getLocalizedText,
  type ClassroomSeries,
  type ClassroomTrack,
} from "@/data/classrooms";

const copy = {
  en: {
    eyebrow: "OpenHW Classroom · Learning Hub",
    title: "OpenHW Classroom",
    subtitle:
      "Structured learning paths for OpenHW and RISC-V hardware. Review a course syllabus first, then move through focused, source-grounded micro-lessons.",
    primaryCta: "Start CVA6 From Zero",
    secondaryCta: "Browse learning areas",
    completePath: "Complete pilot path",
    productionNote:
      "Use this hub as a map: choose a path, inspect its syllabus, then open focused lessons when you are ready to learn.",
    stats: {
      paths: "published paths",
      lessons: "published lessons",
      units: "structured units",
      hours: "estimated hours",
    },
    featuredTitle: "Featured learning path",
    featuredSubtitle:
      "The first complete OpenHW Explorer course path. It is the right starting point for learners who want to understand CVA6 before reading large RTL folders.",
    enterSeries: "Open series page",
    startLesson: "Start first lesson",
    seriesMeta: {
      level: "Level",
      audience: "Audience",
      curriculum: "Curriculum",
    },
    pathHighlights: [
      "Source-grounded slides, narration, and short quizzes",
      "Nine units from orientation to verification handoff",
      "English-first public course, suitable for website publishing",
    ],
    howTitle: "How to use this learning hub",
    howSubtitle: "A simple route from discovery to syllabus review to lesson playback.",
    howItems: [
      {
        title: "Pick a path",
        body: "Choose a course series based on project, level, and learning goal.",
      },
      {
        title: "Review the syllabus",
        body: "Open the series page to inspect units, skills, source anchors, and lesson order.",
      },
      {
        title: "Watch micro-lessons",
        body: "Enter a single lesson for slides, narration, quiz checks, and source context.",
      },
    ],
    catalogTitle: "Course catalog",
    catalogSubtitle:
      "Browse complete course series by project, level, language, and readiness. Individual lessons stay inside each series page.",
    lessonsReady: "lessons ready",
    units: "units",
    hours: "hours",
    openCatalogItem: "View syllabus",
    areasTitle: "Learning areas",
    areasSubtitle:
      "Current and planned tracks stay visible, but planned tracks are intentionally quieter so the page does not overpromise.",
    areaOpen: "Series available",
    areaPlanned: "Planned",
    routeTitle: "Quick routes",
    routeSubtitle: "Useful next steps after landing here.",
    routes: [
      {
        title: "New to CVA6",
        body: "Start with the first lesson and follow the path in order.",
        cta: "Begin lesson",
        hrefType: "lesson",
      },
      {
        title: "Checking the full syllabus",
        body: "Review every unit and lesson before committing time.",
        cta: "Open syllabus",
        hrefType: "series",
      },
      {
        title: "Need reference material",
        body: "Use the resource directory for specs, tools, docs, and communities.",
        cta: "Open resources",
        hrefType: "resources",
      },
    ],
  },
  zh: {
    eyebrow: "OpenHW Classroom · 学习中心",
    title: "OpenHW 交互式课堂",
    subtitle:
      "面向 OpenHW 与 RISC-V 硬件学习的结构化课程路径。先查看完整大纲，再进入基于公开资料制作的聚焦微课程。",
    primaryCta: "开始 CVA6 From Zero",
    secondaryCta: "浏览学习方向",
    completePath: "完整试发布路径",
    productionNote: "把这里当成学习地图：先选择路径，检查大纲，再进入适合当前阶段的一节节微课程。",
    stats: {
      paths: "条已发布路径",
      lessons: "节已发布课程",
      units: "个结构化 Unit",
      hours: "预计小时",
    },
    featuredTitle: "精选学习路径",
    featuredSubtitle:
      "这是 OpenHW Explorer 的第一条完整课程路径。适合希望在打开大型 RTL 目录前，先系统理解 CVA6 的学习者。",
    enterSeries: "打开系列页",
    startLesson: "开始第一课",
    seriesMeta: {
      level: "难度",
      audience: "适合人群",
      curriculum: "课程结构",
    },
    pathHighlights: [
      "基于公开资料的 slides、讲解和小测验",
      "九个 Unit，从入门定位讲到验证交接",
      "英文优先的公开课程，适合嵌入网站发布",
    ],
    howTitle: "这个学习中心应该怎么用",
    howSubtitle: "从发现课程，到查看大纲，再到进入课堂播放，保持一个简单清楚的路径。",
    howItems: [
      {
        title: "选择路径",
        body: "根据项目、难度和学习目标选择一个课程系列。",
      },
      {
        title: "查看大纲",
        body: "进入系列页后，再检查 Unit、Skill、资料锚点和课程顺序。",
      },
      {
        title: "观看微课程",
        body: "进入单课后集中观看 slides、讲解、quiz 和资料上下文。",
      },
    ],
    catalogTitle: "课程目录",
    catalogSubtitle: "按项目、难度、语言和完成状态浏览完整课程系列。具体单课统一放在每个系列页里。",
    lessonsReady: "节已就绪",
    units: "个 Unit",
    hours: "小时",
    openCatalogItem: "查看大纲",
    areasTitle: "学习方向",
    areasSubtitle:
      "已开放与规划中的方向都会保留，但规划项会更克制，避免让用户误以为所有方向都已经上线。",
    areaOpen: "已有系列",
    areaPlanned: "规划中",
    routeTitle: "快速入口",
    routeSubtitle: "进入学习中心后，最常用的几个下一步。",
    routes: [
      {
        title: "第一次学习 CVA6",
        body: "从第一课开始，按顺序完成整个路径。",
        cta: "开始课程",
        hrefType: "lesson",
      },
      {
        title: "先检查完整大纲",
        body: "投入学习前，先看所有 Unit 和 Lesson 安排。",
        cta: "打开大纲",
        hrefType: "series",
      },
      {
        title: "需要参考资料",
        body: "进入 Resources 页面查看规格、工具、文档和社区入口。",
        cta: "打开资料库",
        hrefType: "resources",
      },
    ],
  },
} as const;

const trackIcons = {
  "processor-cores": Cpu,
  verification: ShieldCheck,
  contribution: Route,
  "source-library": LibraryBig,
} as const;

const routeIcons = [PlayCircle, ListChecks, FileText] as const;

type ClassroomContentProps = {
  locale: string;
};

function statusLabel(series: ClassroomSeries, locale: "en" | "zh") {
  if (series.status === "pilot") return locale === "zh" ? "试发布" : "Pilot";
  return locale === "zh" ? "规划中" : "Planned";
}

function getTrack(series: ClassroomSeries) {
  return classroomTracks.find((track) => track.id === series.trackId);
}

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
      <div className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">{value}</div>
      <div className="mt-1 text-xs font-medium leading-5 text-[var(--text-tertiary)]">{label}</div>
    </div>
  );
}

function TrackCard({
  track,
  locale,
  openLabel,
  plannedLabel,
}: {
  track: ClassroomTrack;
  locale: "en" | "zh";
  openLabel: string;
  plannedLabel: string;
}) {
  const Icon = trackIcons[track.id as keyof typeof trackIcons] ?? BookOpen;
  const firstSeriesId = track.seriesIds[0];
  const isOpen = track.status === "open" && Boolean(firstSeriesId);

  const body = (
    <article
      className={`h-full rounded-2xl border p-4 transition ${
        isOpen
          ? "border-[var(--border)] bg-[var(--bg-card)] hover:-translate-y-0.5 hover:border-[var(--primary)]/35 hover:shadow-[var(--card-shadow)]"
          : "border-[var(--border)] bg-[var(--bg-subtle)]"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
            isOpen
              ? "border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)]"
              : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-tertiary)]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
            isOpen
              ? "border-[var(--green)]/30 bg-[var(--green)]/10 text-[var(--green)]"
              : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-tertiary)]"
          }`}
        >
          {isOpen ? openLabel : plannedLabel}
        </span>
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)]">
        {getLocalizedText(track.title, locale)}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {getLocalizedText(track.description, locale)}
      </p>
      <div
        className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
          isOpen ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"
        }`}
      >
        {isOpen ? openLabel : plannedLabel}
        {isOpen && <ArrowRight className="h-4 w-4" />}
      </div>
    </article>
  );

  if (!isOpen) return body;

  return (
    <Link href={`/classroom/${firstSeriesId}`} className="block h-full">
      {body}
    </Link>
  );
}

export function ClassroomContent({ locale }: ClassroomContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const activeSeries = classroomSeries[0];
  const featuredLesson = getFeaturedLesson(activeSeries);
  const availableSeries = classroomSeries.filter((series) => series.lessonsReady > 0);
  const totalReadyLessons = classroomSeries.reduce((sum, series) => sum + series.lessonsReady, 0);
  const totalUnits = classroomSeries.reduce((sum, series) => sum + series.units.length, 0);
  const firstLessonHref =
    featuredLesson?.id != null
      ? `/classroom/${activeSeries.id}/${featuredLesson.id}`
      : `/classroom/${activeSeries.id}`;

  const routeHrefs = {
    lesson: firstLessonHref,
    series: `/classroom/${activeSeries.id}`,
    resources: "/resources",
  } as const;

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-10">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t.subtitle}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/classroom/${activeSeries.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-colors hover:bg-[var(--primary-dark)]"
              >
                <Sparkles className="h-4 w-4" />
                {t.primaryCta}
              </Link>
              <a
                href="#learning-areas"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
              >
                <Compass className="h-4 w-4" />
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t.completePath}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                CVA6
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard value={availableSeries.length} label={t.stats.paths} />
              <StatCard value={totalReadyLessons} label={t.stats.lessons} />
              <StatCard value={totalUnits} label={t.stats.units} />
              <StatCard value={activeSeries.estimatedHours} label={t.stats.hours} />
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              {t.productionNote}
            </p>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)] lg:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  <Target className="h-3.5 w-3.5" />
                  {t.featuredTitle}
                </div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {getLocalizedText(activeSeries.title, resolvedLocale)}
                </h2>
              </div>
              <span className="w-fit rounded-full border border-[var(--green)]/30 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                {activeSeries.lessonsReady}/{activeSeries.lessonsPlanned}
              </span>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.featuredSubtitle}
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    {t.seriesMeta.level}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-primary)]">
                    {getLocalizedText(activeSeries.level, resolvedLocale)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    {t.seriesMeta.audience}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-primary)]">
                    {getLocalizedText(activeSeries.audience, resolvedLocale)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    {t.seriesMeta.curriculum}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-primary)]">
                    {activeSeries.units.length} {t.units} · {activeSeries.lessonsReady}{" "}
                    {t.lessonsReady} · {activeSeries.estimatedHours} {t.hours}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                {t.pathHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[var(--green)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/classroom/${activeSeries.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                {t.enterSeries}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {featuredLesson && (
                <Link
                  href={firstLessonHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
                >
                  <PlayCircle className="h-4 w-4" />
                  {t.startLesson}
                </Link>
              )}
            </div>
          </article>

          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
              Track → Series → Lesson
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{t.howTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{t.howSubtitle}</p>
            <div className="mt-5 space-y-4">
              {t.howItems.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                {t.catalogTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                {t.catalogSubtitle}
              </p>
            </div>
          </div>

          <div
            className={`grid gap-4 ${classroomSeries.length > 1 ? "lg:grid-cols-2" : "lg:max-w-4xl"}`}
          >
            {classroomSeries.map((series) => {
              const track = getTrack(series);
              return (
                <article
                  key={series.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--primary)]/35 hover:shadow-[var(--card-shadow)]"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                      {statusLabel(series, resolvedLocale)}
                    </span>
                    {track && (
                      <span className="rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                        {getLocalizedText(track.title, resolvedLocale)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(series.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {getLocalizedText(series.subtitle, resolvedLocale)}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <ListChecks className="h-4 w-4 text-[var(--primary)]" />
                      <span>
                        {series.lessonsReady} {t.lessonsReady}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Layers3 className="h-4 w-4 text-[var(--primary)]" />
                      <span>
                        {series.units.length} {t.units}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Clock3 className="h-4 w-4 text-[var(--primary)]" />
                      <span>
                        {series.estimatedHours} {t.hours}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/classroom/${series.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    {t.openCatalogItem}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section id="learning-areas" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.areasTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.areasSubtitle}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {classroomTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                locale={resolvedLocale}
                openLabel={t.areaOpen}
                plannedLabel={t.areaPlanned}
              />
            ))}
          </div>
        </section>

        <section className="mb-4 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)] lg:p-6">
          <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                <Route className="h-3.5 w-3.5" />
                {t.routeTitle}
              </div>
              <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                {t.routeSubtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {t.routes.map((route, index) => {
              const Icon = routeIcons[index] ?? BookOpen;
              return (
                <Link
                  key={route.title}
                  href={routeHrefs[route.hrefType]}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 transition hover:border-[var(--primary)]/35 hover:bg-[var(--bg-card-hover)]"
                >
                  <Icon className="mb-4 h-5 w-5 text-[var(--primary)]" />
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {route.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--text-secondary)]">
                    {route.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    {route.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
