import {
  ArrowRight,
  BookOpenText,
  Clock3,
  GraduationCap,
  Languages,
  Library,
  PlayCircle,
  Route,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  getCatalogLessons,
  getDevelopmentClassroomSeries,
  getFeaturedClassroomSeries,
  getLocalizedText,
  getPrototypeLesson,
  hasPublishedLesson,
  type ClassroomLessonStatus,
} from "@/data/classrooms";

const copy = {
  en: {
    eyebrow: "Learning Hub",
    title: "Learn OpenHW, one clear idea at a time.",
    subtitle:
      "Short, source-checked lessons today. Deeper processor courses and selected OpenHW learning material over time.",
    navLabel: "Learning collections",
    collections: [
      {
        id: "essentials",
        title: "Essentials",
        description: "Five short introductions",
      },
      {
        id: "deep-dives",
        title: "Deep dives",
        description: "Original technical courses",
      },
      {
        id: "openhw-library",
        title: "OpenHW library",
        description: "Selected public material",
      },
    ],
    essentialsKicker: "First collection",
    essentialsTitle: "OpenHW Essentials",
    essentialsBody:
      "Five focused lessons for reading the organization, its projects, and the evidence around them.",
    viewCollection: "View collection",
    duration: "6-10 min",
    level: "Starter",
    language: "English first",
    deepDiveKicker: "Original courses",
    deepDiveTitle: "Go deeper when the foundation is clear",
    deepDiveBody:
      "CVA6 From Zero remains the first long-form course in development. The Learning Hub will add reviewed deep dives gradually, not all at once.",
    viewRoadmap: "View CVA6 course map",
    libraryKicker: "Curated learning",
    libraryTitle: "A home for strong OpenHW material",
    libraryBody:
      "Selected public talks, tutorials, and official courses will sit beside original lessons, with their source and author kept visible.",
    browseResources: "Browse technical resources",
    previewsKicker: "Classroom preview",
    previewsTitle: "See how an interactive lesson works",
    previewsBody:
      "Earlier samples remain available as format previews while the new lessons are rebuilt.",
    openPreview: "Open preview",
    statuses: {
      published: "Available",
      "editorial-review": "Final review",
      "in-production": "In progress",
      planned: "Next",
      prototype: "Preview",
    },
  },
  zh: {
    eyebrow: "学习园地",
    title: "一次讲清一个 OpenHW 概念。",
    subtitle: "从短小、来源可追溯的课程开始，逐步扩展到处理器深度课和精选 OpenHW 学习资料。",
    navLabel: "学习内容",
    collections: [
      {
        id: "essentials",
        title: "核心概念",
        description: "五节短小入门课",
      },
      {
        id: "deep-dives",
        title: "深度课程",
        description: "原创技术系列",
      },
      {
        id: "openhw-library",
        title: "OpenHW 精选",
        description: "公开优质资料",
      },
    ],
    essentialsKicker: "首发系列",
    essentialsTitle: "OpenHW 核心概念",
    essentialsBody: "用五节聚焦短课读懂 OpenHW 的组织、项目，以及判断项目所需的技术证据。",
    viewCollection: "查看系列",
    duration: "6-10 分钟",
    level: "入门",
    language: "英文优先",
    deepDiveKicker: "原创课程",
    deepDiveTitle: "建立基础后，再进入技术深处",
    deepDiveBody:
      "CVA6 从零开始是首个开发中的长课程。学习园地会逐步加入经过人工核对的深度课，而不是一次摆出庞大的未完成目录。",
    viewRoadmap: "查看 CVA6 课程地图",
    libraryKicker: "精选学习资料",
    libraryTitle: "为优质 OpenHW 内容留出位置",
    libraryBody:
      "未来会把经过筛选的公开 talk、tutorial 和官方课程与原创课程放在一起，并清楚保留作者和来源。",
    browseResources: "浏览技术资料",
    previewsKicker: "课堂预览",
    previewsTitle: "体验交互式课程形式",
    previewsBody: "新课程重制期间，早期样课继续作为播放器形式预览保留。",
    openPreview: "打开预览",
    statuses: {
      published: "可学习",
      "editorial-review": "最终审核",
      "in-production": "制作中",
      planned: "后续制作",
      prototype: "形式预览",
    },
  },
} as const;

type ClassroomContentProps = { locale: string };

const collectionIcons = [BookOpenText, Route, Library] as const;

export function ClassroomContent({ locale }: ClassroomContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const text = copy[resolvedLocale];
  const [releaseSeries] = getFeaturedClassroomSeries();
  const developmentSeries = getDevelopmentClassroomSeries();
  const releaseLessons = releaseSeries ? getCatalogLessons(releaseSeries) : [];
  const prototypeEntries = [...getFeaturedClassroomSeries(), ...developmentSeries]
    .map((series) => ({ series, lesson: getPrototypeLesson(series) }))
    .filter(
      (
        entry,
      ): entry is {
        series: (typeof developmentSeries)[number];
        lesson: NonNullable<ReturnType<typeof getPrototypeLesson>>;
      } => Boolean(entry.lesson && hasPublishedLesson(entry.lesson)),
    );

  const getStatusLabel = (status: ClassroomLessonStatus) => text.statuses[status];

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <section className="max-w-5xl pb-10 pt-5 sm:pb-12 lg:pb-16 lg:pt-8">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
            <GraduationCap className="h-4 w-4" />
            {text.eyebrow}
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {text.subtitle}
          </p>
        </section>

        <nav
          aria-label={text.navLabel}
          className="grid border-y border-[var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-[var(--border)]"
        >
          {text.collections.map((collection, index) => {
            const Icon = collectionIcons[index];
            return (
              <a
                key={collection.id}
                href={`#${collection.id}`}
                className="group flex min-h-24 items-center gap-4 border-b border-[var(--border)] px-1 py-5 transition-colors last:border-b-0 hover:text-[var(--primary)] sm:border-b-0 sm:px-6"
              >
                <Icon className="h-5 w-5 shrink-0 text-[var(--primary)]" />
                <span>
                  <span className="block text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)]">
                    {collection.title}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--text-tertiary)]">
                    {collection.description}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>

        {releaseSeries && (
          <section id="essentials" className="scroll-mt-28 py-14 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--primary)]">
                  {text.essentialsKicker}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                  {text.essentialsTitle}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {text.essentialsBody}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--text-tertiary)]">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpenText className="h-3.5 w-3.5" />
                    {releaseLessons.length}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {text.duration}
                  </span>
                  <span>{text.level}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Languages className="h-3.5 w-3.5" />
                    {text.language}
                  </span>
                </div>
              </div>
              <Link
                href={`/classroom/${releaseSeries.id}`}
                className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                {text.viewCollection}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-9 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {releaseLessons.map((lesson, index) => {
                const isAvailable = lesson.status === "published" && hasPublishedLesson(lesson);
                const title = getLocalizedText(lesson.title, resolvedLocale);

                return (
                  <article
                    key={lesson.id}
                    className="grid gap-4 py-6 sm:grid-cols-[52px_1fr_auto] sm:items-start sm:gap-6"
                  >
                    <span className="font-mono text-sm font-semibold text-[var(--primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {isAvailable ? (
                        <Link
                          href={`/classroom/${releaseSeries.id}/${lesson.id}`}
                          className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] sm:text-xl"
                        >
                          {title}
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                          {title}
                        </h3>
                      )}
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                        {getLocalizedText(lesson.summary, resolvedLocale)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] sm:flex-col sm:items-end sm:text-right">
                      <span className="font-semibold text-[var(--text-secondary)]">
                        {getStatusLabel(lesson.status)}
                      </span>
                      <span>{lesson.durationMinutes} min</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="grid border-y border-[var(--border)] lg:grid-cols-2 lg:divide-x lg:divide-[var(--border)]">
          <div id="deep-dives" className="scroll-mt-28 py-12 lg:pr-12">
            <p className="text-xs font-semibold uppercase text-[var(--primary)]">
              {text.deepDiveKicker}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
              {text.deepDiveTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              {text.deepDiveBody}
            </p>
            {developmentSeries[0] && (
              <Link
                href={`/classroom/${developmentSeries[0].id}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                {text.viewRoadmap}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div id="openhw-library" className="scroll-mt-28 py-12 lg:pl-12">
            <p className="text-xs font-semibold uppercase text-[var(--primary)]">
              {text.libraryKicker}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
              {text.libraryTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              {text.libraryBody}
            </p>
            <Link
              href="/resources"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
            >
              {text.browseResources}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {prototypeEntries.length > 0 && (
          <section className="py-12 lg:py-16">
            <p className="text-xs font-semibold uppercase text-[var(--text-tertiary)]">
              {text.previewsKicker}
            </p>
            <div className="mt-3 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {text.previewsTitle}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
                  {text.previewsBody}
                </p>
              </div>
              <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {prototypeEntries.map(({ series, lesson }) => (
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
                      {text.openPreview}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
