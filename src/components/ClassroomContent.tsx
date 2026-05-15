import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers3,
  LibraryBig,
  PlayCircle,
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
  getReadyLessons,
} from "@/data/classrooms";

const copy = {
  en: {
    eyebrow: "OpenHW Classroom · Learning center",
    title: "Learn OpenHW through source-grounded micro-courses",
    subtitle:
      "Start with the CVA6 pilot path, then follow future course tracks as they become production-ready. The learning center favors reviewed series over a crowded catalog.",
    primaryCta: "Start the CVA6 pilot",
    secondaryCta: "View roadmap",
    currentLabel: "Featured course series",
    pilot: "Pilot",
    roadmap: "Roadmap",
    availableNow: "Available now",
    seriesTitle: "Featured course series",
    seriesSubtitle:
      "The public entry should point learners to the strongest available path first. CVA6 is the pilot series for validating the course format, source workflow, and playback experience.",
    enterSeries: "Enter series",
    readyLessons: "ready lessons",
    unitsMapped: "mapped units",
    estimated: "estimated hours",
    featuredLesson: "Featured lesson",
    readyLessonsTitle: "Ready to try",
    structureTitle: "How the learning center works",
    structureSubtitle:
      "Keep discovery, syllabus review, and lesson playback separated so the page can grow without becoming a long flat list.",
    structureItems: [
      {
        title: "Choose a track",
        body: "Use broad areas only as a roadmap, not as a promise that every course is already finished.",
      },
      {
        title: "Inspect a series",
        body: "Review units, skills, lesson status, and source references before entering a course.",
      },
      {
        title: "Play one micro-lesson",
        body: "Open a focused lesson with slides, narration, quiz, and source anchors.",
      },
    ],
    tracksTitle: "Learning areas",
    tracksSubtitle:
      "Only mature content should feel clickable. Planned areas stay visible as direction markers, but subdued enough that they do not overpromise the current library.",
    openTrack: "Explore series",
    planned: "Planned",
  },
  zh: {
    eyebrow: "OpenHW Classroom · 学习中心",
    title: "用有资料依据的微课程学习 OpenHW",
    subtitle:
      "当前先从 CVA6 试发布课程开始，后续课程方向会在内容真正成熟后逐步开放。学习中心应该优先展示已审核、可进入的课程系列，而不是一开始就堆满目录。",
    primaryCta: "开始 CVA6 试发布",
    secondaryCta: "查看路线图",
    currentLabel: "精选课程系列",
    pilot: "试发布",
    roadmap: "路线图",
    availableNow: "当前可学",
    seriesTitle: "精选课程系列",
    seriesSubtitle:
      "公开入口应该先把用户带到最值得体验的课程线。CVA6 是当前用于验证课程格式、资料流程和播放体验的试发布系列。",
    enterSeries: "进入系列",
    readyLessons: "节已就绪",
    unitsMapped: "个规划 Unit",
    estimated: "预计小时",
    featuredLesson: "精选样课",
    readyLessonsTitle: "可以先体验",
    structureTitle: "学习中心的浏览方式",
    structureSubtitle:
      "把入口发现、系列大纲和单课播放分开，页面未来可以扩展，但不会变成一个很长的平铺列表。",
    structureItems: [
      {
        title: "选择方向",
        body: "学习方向主要作为路线图存在，不代表每条课程线都已经完成。",
      },
      {
        title: "查看系列",
        body: "进入系列页后，再看 Unit、Skill、课程状态和资料来源。",
      },
      {
        title: "播放单课",
        body: "打开一节微课程，集中观看 slides、讲解、quiz 和资料锚点。",
      },
    ],
    tracksTitle: "学习方向",
    tracksSubtitle:
      "只有成熟内容才应该显得强可点击。规划中的方向保留为路线标记，但视觉上降低承诺感，避免让用户误以为已经全部上线。",
    openTrack: "进入系列",
    planned: "规划中",
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
  const readyLessons = getReadyLessons(activeSeries);

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-4 lg:grid-cols-[1fr_360px] lg:items-end lg:py-8">
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
                <Layers3 className="h-4 w-4" />
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t.currentLabel}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                CVA6
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {getLocalizedText(activeSeries.title, resolvedLocale)}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {getLocalizedText(activeSeries.subtitle, resolvedLocale)}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {activeSeries.lessonsReady}
                </div>
                <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                  {t.readyLessons}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {activeSeries.units.length}
                </div>
                <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                  {t.unitsMapped}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {activeSeries.estimatedHours}
                </div>
                <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                  {t.estimated}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="scroll-mt-24">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
                <PlayCircle className="h-3.5 w-3.5" />
                {t.availableNow}
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.seriesTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                {t.seriesSubtitle}
              </p>
            </div>
            <Link
              href={`/classroom/${activeSeries.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
            >
              {t.enterSeries}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  {t.pilot}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {getLocalizedText(activeSeries.title, resolvedLocale)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {getLocalizedText(activeSeries.description, resolvedLocale)}
                </p>
                {featuredLesson && (
                  <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                      {t.featuredLesson}
                    </p>
                    <Link
                      href={`/classroom/${activeSeries.id}/${featuredLesson.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    >
                      {getLocalizedText(featuredLesson.title, resolvedLocale)}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {t.readyLessonsTitle}
                  </h3>
                </div>
                <div className="space-y-3">
                  {readyLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/classroom/${activeSeries.id}/${lesson.id}`}
                      className="group block rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-colors hover:border-[var(--text-tertiary)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">
                            {getLocalizedText(lesson.title, resolvedLocale)}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">
                            {getLocalizedText(lesson.outcome, resolvedLocale)}
                          </p>
                        </div>
                        <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-[var(--primary)] opacity-70 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                Track → Series → Lesson
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                {t.structureTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {t.structureSubtitle}
              </p>
            </div>
            <div className="grid flex-1 gap-3 md:grid-cols-3">
              {t.structureItems.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
                >
                  <div className="mb-2 text-xs font-semibold text-[var(--primary)]">
                    0{index + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="learning-areas" className="mb-4 scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t.tracksTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.tracksSubtitle}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {classroomTracks.map((track) => {
              const Icon = trackIcons[track.id as keyof typeof trackIcons] ?? BookOpen;
              const firstSeriesId = track.seriesIds[0];
              const isOpen = track.status === "open" && firstSeriesId;

              const card = (
                <article
                  className={`h-full rounded-2xl border p-4 transition-all ${
                    isOpen
                      ? "border-[var(--border)] bg-[var(--bg-card)] hover:-translate-y-0.5 hover:border-[var(--text-tertiary)]"
                      : "border-[var(--border)] bg-[var(--bg-subtle)] opacity-80"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isOpen
                          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                          : "bg-[var(--bg-card)] text-[var(--text-tertiary)]"
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
                      {isOpen ? t.pilot : t.roadmap}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(track.title, resolvedLocale)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {getLocalizedText(track.description, resolvedLocale)}
                  </p>
                  <div
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
                      isOpen ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"
                    }`}
                  >
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
      </div>
    </div>
  );
}
