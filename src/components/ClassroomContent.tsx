import {
  ArrowRight,
  BookOpen,
  Boxes,
  Cpu,
  GraduationCap,
  Layers3,
  LibraryBig,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  classroomSeries,
  classroomTracks,
  getFeaturedLesson,
  getLocalizedText,
} from "@/data/classrooms";

const copy = {
  en: {
    eyebrow: "OpenHW Classroom · Learning center",
    title: "Choose a structured path into open hardware",
    subtitle:
      "OpenHW Explorer Classroom is organized as a learning center, not a single long page. Start from a topic area, enter a course series, then open individual micro-lessons only when you are ready to learn.",
    primaryCta: "Browse learning paths",
    secondaryCta: "Open CVA6 pilot",
    tracksTitle: "Learning areas",
    tracksSubtitle:
      "The top level stays intentionally broad so future course series, source libraries, and contribution guides can be added without crowding one page.",
    openTrack: "Explore",
    planned: "Planned",
    pilot: "Pilot",
    seriesTitle: "Featured course series",
    seriesSubtitle:
      "Series pages carry the actual syllabus, unit map, review status, and lesson list. This keeps the public entry page clean.",
    enterSeries: "Enter series",
    readyLessons: "ready",
    plannedLessons: "planned",
    estimated: "estimated hours",
    featuredLesson: "Featured lesson",
    methodTitle: "Publishing architecture",
    methodSubtitle:
      "Professional learning sites separate discovery, curriculum inspection, and playback. This mirrors that structure for OpenHW technical courses.",
    methodItems: [
      {
        title: "Top-level discovery",
        body: "Choose by learning area: processor cores, verification, contribution, or source library.",
      },
      {
        title: "Series syllabus",
        body: "Inspect units, skills, lesson status, prerequisites, and source-grounded outcomes.",
      },
      {
        title: "Lesson playback",
        body: "Open a single micro-lesson with slides, narration, quiz, and source anchors.",
      },
    ],
  },
  zh: {
    eyebrow: "OpenHW Classroom · 学习中心",
    title: "选择一条进入开放硬件的结构化学习路径",
    subtitle:
      "OpenHW Explorer Classroom 应该是一个学习中心，而不是一个很长的课程堆叠页。用户先选择学习方向，再进入课程系列，最后才打开具体微课程。",
    primaryCta: "浏览学习方向",
    secondaryCta: "进入 CVA6 试发布",
    tracksTitle: "学习方向",
    tracksSubtitle:
      "顶层页面只负责分类和选择，未来可以继续加入更多课程系列、资料库和贡献指南，而不会挤在一个页面里。",
    openTrack: "进入",
    planned: "规划中",
    pilot: "试发布",
    seriesTitle: "精选课程系列",
    seriesSubtitle:
      "课程系列页才承载 syllabus、Unit 地图、审核状态和 lesson 列表。这样公开入口会更干净，也更适合长期扩展。",
    enterSeries: "进入系列",
    readyLessons: "已就绪",
    plannedLessons: "规划中",
    estimated: "预计小时",
    featuredLesson: "精选样课",
    methodTitle: "发布信息架构",
    methodSubtitle:
      "成熟课程网站会把发现入口、课程大纲和播放页面分层。这里也按同样原则组织 OpenHW 技术课。",
    methodItems: [
      {
        title: "顶层发现",
        body: "按学习方向选择：处理器核心、验证实践、贡献入门或资料库。",
      },
      {
        title: "系列大纲",
        body: "查看 Unit、Skill、Lesson 状态、前置要求和基于资料的学习目标。",
      },
      {
        title: "单课播放",
        body: "进入一节微课程，观看 slides、老陈讲解、quiz 和资料引用。",
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

type ClassroomContentProps = {
  locale: string;
};

export function ClassroomContent({ locale }: ClassroomContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const activeSeries = classroomSeries[0];
  const featuredLesson = getFeaturedLesson(activeSeries);

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="py-4 lg:py-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t.subtitle}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#learning-areas"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-colors hover:bg-[var(--primary-dark)]"
              >
                <Sparkles className="h-4 w-4" />
                {t.primaryCta}
              </a>
              <Link
                href={`/classroom/${activeSeries.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
              >
                <Layers3 className="h-4 w-4" />
                {t.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section id="learning-areas" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.tracksTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.tracksSubtitle}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {classroomTracks.map((track) => {
              const Icon = trackIcons[track.id as keyof typeof trackIcons] ?? BookOpen;
              const firstSeriesId = track.seriesIds[0];
              const isOpen = track.status === "open" && firstSeriesId;

              const card = (
                <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--text-tertiary)]">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        track.status === "open"
                          ? "border-[var(--green)]/30 bg-[var(--green)]/10 text-[var(--green)]"
                          : "border-[var(--orange)]/30 bg-[var(--orange)]/10 text-[var(--orange)]"
                      }`}
                    >
                      {track.status === "open" ? t.pilot : t.planned}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(track.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {getLocalizedText(track.description, resolvedLocale)}
                  </p>
                  <p className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3 text-xs leading-6 text-[var(--text-tertiary)]">
                    {getLocalizedText(track.audience, resolvedLocale)}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    {isOpen ? t.openTrack : t.planned}
                    {isOpen && <ArrowRight className="h-4 w-4" />}
                  </div>
                </article>
              );

              return isOpen ? (
                <Link key={track.id} href={`/classroom/${firstSeriesId}`} className="block">
                  {card}
                </Link>
              ) : (
                <div key={track.id}>{card}</div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                {t.methodTitle}
              </p>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Track → Series → Lesson
              </h2>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {t.methodSubtitle}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {t.methodItems.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
              >
                <div className="mb-1 text-xs font-semibold text-[var(--primary)]">0{index + 1}</div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4 scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.seriesTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.seriesSubtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                  {t.pilot}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {getLocalizedText(activeSeries.title, resolvedLocale)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {getLocalizedText(activeSeries.description, resolvedLocale)}
                </p>
                {featuredLesson && (
                  <p className="mt-4 text-xs font-medium text-[var(--text-tertiary)]">
                    {t.featuredLesson}: {getLocalizedText(featuredLesson.title, resolvedLocale)}
                  </p>
                )}
              </div>
              <div className="grid min-w-full grid-cols-3 gap-3 lg:min-w-[360px]">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    {activeSeries.lessonsReady}
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.readyLessons}</div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    {activeSeries.lessonsPlanned}
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.plannedLessons}</div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    {activeSeries.estimatedHours}
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t.estimated}</div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Link
                href={`/classroom/${activeSeries.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                {t.enterSeries}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
