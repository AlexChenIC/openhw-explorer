import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  ExternalLink,
  GraduationCap,
  Github,
  Languages,
  Library,
  Mail,
  MessageSquareText,
  PlayCircle,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/routing";
import { externalLinks } from "@/data/external-links";
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
    lessonLabel: "Lesson",
    slidesLabel: "slides",
    checksLabel: "checks",
    startLesson: "Start lesson",
    plannedLesson: "In development",
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
    communityKicker: "Shape what comes next",
    communityTitle: "Stay close to the Learning Hub",
    communityBody:
      "Hear about meaningful course releases and selected public OpenHW or RISC-V events, or tell Alex which lesson would help you next.",
    subscribeTitle: "Course and event updates",
    subscribeBody:
      "Occasional email when there is something worth sharing. You will confirm your address before the first update.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    subscribeAction: "Subscribe",
    subscriptionsSoon: "Email subscriptions are being prepared.",
    subscribeNote:
      "Free to join. Unsubscribe at any time. OpenHW Explorer is an independent community project.",
    requestTitle: "Suggest the next lesson",
    requestBody:
      "Send Alex a private message, or open a public request so other learners can add context.",
    privateAction: "Message Alex privately",
    privateMeta: "via LinkedIn",
    publicAction: "Post a public course request",
    publicMeta: "on GitHub",
    publicNote: "GitHub requests are visible to everyone.",
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
    lessonLabel: "课程",
    slidesLabel: "页",
    checksLabel: "道练习",
    startLesson: "开始学习",
    plannedLesson: "开发中",
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
    communityKicker: "一起决定下一步",
    communityTitle: "关注学习园地的新进展",
    communityBody:
      "在重要课程发布或有值得关注的 OpenHW、RISC-V 公开活动时收到通知，也可以告诉 Alex 你最需要哪一课。",
    subscribeTitle: "订阅课程与活动更新",
    subscribeBody: "只在有值得分享的内容时发送。首次接收前，需要通过邮件确认订阅。",
    emailLabel: "邮箱地址",
    emailPlaceholder: "you@example.com",
    subscribeAction: "订阅更新",
    subscriptionsSoon: "邮箱订阅入口正在准备中。",
    subscribeNote: "免费订阅，可随时退订。OpenHW Explorer 是独立社区项目。",
    requestTitle: "建议下一门课程",
    requestBody: "可以私下告诉 Alex，也可以公开提出建议，让其他学习者补充需求。",
    privateAction: "私信 Alex",
    privateMeta: "通过 LinkedIn",
    publicAction: "公开提交课程建议",
    publicMeta: "通过 GitHub",
    publicNote: "GitHub 中的建议对所有人公开。",
    statuses: {
      published: "可学习",
      "editorial-review": "最终审核",
      "in-production": "制作中",
      planned: "后续制作",
      prototype: "形式预览",
    },
  },
} as const;

type ClassroomContentProps = {
  locale: string;
  newsletterUsername?: string;
};

const collectionIcons = [BookOpenText, Route, Library] as const;

const defaultLessonVisual = {
  image: "/classroom/course-marks/core-v.png",
  width: 2048,
  height: 456,
  className: "w-[17rem] max-w-full",
  alt: {
    en: "CORE-V",
    zh: "CORE-V",
  },
};

const lessonVisuals = {
  "openhw-u01-l01-core-v-names": {
    image: "/classroom/course-marks/core-v.png",
    width: 2048,
    height: 456,
    className: "w-[17rem] max-w-full",
    alt: {
      en: "CORE-V",
      zh: "CORE-V",
    },
  },
  "openhw-u02-l01-foundation": {
    image: "/classroom/course-marks/openhw-foundation.png",
    width: 559,
    height: 117,
    className: "w-[17rem] max-w-full",
    alt: {
      en: "OpenHW Foundation",
      zh: "OpenHW Foundation",
    },
  },
  "openhw-u03-l01-riscv-corev-core-soc": {
    image: "/classroom/course-marks/isa-core-soc.png",
    width: 2073,
    height: 758,
    className: "w-[15rem] max-w-full",
    alt: {
      en: "Three stages representing ISA, processor core, and SoC",
      zh: "代表 ISA、处理器核与 SoC 的三个递进阶段",
    },
  },
  "openhw-u04-l01-why-verification": {
    image: "/classroom/course-marks/verification.png",
    width: 1254,
    height: 1254,
    className: "w-24 max-w-full",
    alt: {
      en: "Verified processor",
      zh: "通过验证的处理器",
    },
  },
  "openhw-u05-l01-beyond-rtl": {
    image: "/classroom/course-marks/beyond-rtl.png",
    width: 1254,
    height: 1254,
    className: "w-24 max-w-full",
    alt: {
      en: "A processor supported by a complete engineering system",
      zh: "由完整工程体系支撑的处理器",
    },
  },
} as const;

export function ClassroomContent({ locale, newsletterUsername }: ClassroomContentProps) {
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
  const newsletterAction = newsletterUsername
    ? `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(newsletterUsername)}`
    : undefined;

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

            <div className="mt-9 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
              {releaseLessons.map((lesson, index) => {
                const isAvailable = lesson.status === "published" && hasPublishedLesson(lesson);
                const title = getLocalizedText(lesson.title, resolvedLocale);
                const visual =
                  lessonVisuals[lesson.id as keyof typeof lessonVisuals] ?? defaultLessonVisual;

                return (
                  <article
                    key={lesson.id}
                    className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border bg-[var(--bg-card)] transition-[border-color,box-shadow,transform] ${
                      isAvailable
                        ? "border-[var(--border)] hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-lg"
                        : "border-[var(--border)]"
                    }`}
                  >
                    <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-[var(--border)] bg-white px-10 py-6">
                      <Image
                        src={visual.image}
                        alt={getLocalizedText(visual.alt, resolvedLocale)}
                        width={visual.width}
                        height={visual.height}
                        sizes="272px"
                        loading={index < 3 ? "eager" : "lazy"}
                        className={`h-auto w-auto object-contain ${visual.className}`}
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2 py-1 font-mono text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
                        {text.lessonLabel} {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span
                          className={`inline-flex min-h-7 items-center rounded-md px-2.5 font-semibold ${
                            isAvailable
                              ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                              : "bg-[var(--bg-muted)] text-[var(--text-tertiary)]"
                          }`}
                        >
                          {getStatusLabel(lesson.status)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[var(--text-tertiary)]">
                          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                          {lesson.durationMinutes} min
                        </span>
                      </div>

                      {isAvailable ? (
                        <Link
                          href={`/classroom/${releaseSeries.id}/${lesson.id}`}
                          className="mt-5 text-xl font-semibold leading-snug text-[var(--text-primary)] hover:text-[var(--primary)]"
                        >
                          {title}
                        </Link>
                      ) : (
                        <h3 className="mt-5 text-xl font-semibold leading-snug text-[var(--text-primary)]">
                          {title}
                        </h3>
                      )}
                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--text-secondary)]">
                        {getLocalizedText(lesson.summary, resolvedLocale)}
                      </p>

                      {isAvailable && (
                        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-tertiary)]">
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpenText className="h-3.5 w-3.5" aria-hidden="true" />
                            {lesson.slideCount} {text.slidesLabel}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            {lesson.quizCount} {text.checksLabel}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                            EN / 中文
                          </span>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {lesson.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-[var(--bg-muted)] px-2.5 py-1 text-xs text-[var(--text-tertiary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto border-t border-[var(--border)] pt-5">
                        {isAvailable ? (
                          <Link
                            href={`/classroom/${releaseSeries.id}/${lesson.id}`}
                            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                          >
                            {text.startLesson}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--text-tertiary)]">
                            {text.plannedLesson}
                          </span>
                        )}
                      </div>
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

        <section className="border-y border-[var(--border)] py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase text-[var(--primary)]">
            {text.communityKicker}
          </p>
          <div className="mt-3 max-w-3xl">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              {text.communityTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {text.communityBody}
            </p>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:divide-x lg:divide-[var(--border)]">
            <div className="lg:pr-12">
              <Mail className="h-5 w-5 text-[var(--primary)]" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {text.subscribeTitle}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                {text.subscribeBody}
              </p>

              {newsletterAction ? (
                <form action={newsletterAction} method="post" className="mt-5 max-w-xl">
                  <label
                    htmlFor="learning-hub-email"
                    className="text-xs font-semibold text-[var(--text-secondary)]"
                  >
                    {text.emailLabel}
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="learning-hub-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder={text.emailPlaceholder}
                      className="min-h-11 min-w-0 flex-1 border border-[var(--border)] bg-[var(--bg-card)] px-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-dark)]"
                    >
                      {text.subscribeAction}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <input type="hidden" name="embed" value="1" />
                </form>
              ) : (
                <p className="mt-5 text-sm font-semibold text-[var(--text-tertiary)]">
                  {text.subscriptionsSoon}
                </p>
              )}

              <p className="mt-3 max-w-xl text-xs leading-5 text-[var(--text-tertiary)]">
                {text.subscribeNote}
              </p>
            </div>

            <div className="border-t border-[var(--border)] pt-8 lg:border-t-0 lg:pl-12 lg:pt-0">
              <MessageSquareText className="h-5 w-5 text-[var(--primary)]" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {text.requestTitle}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                {text.requestBody}
              </p>

              <div className="mt-5 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                <a
                  href={externalLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--primary)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <MessageSquareText className="h-4 w-4 text-[var(--primary)]" />
                    <span>
                      <span className="block">{text.privateAction}</span>
                      <span className="mt-0.5 block text-xs font-normal text-[var(--text-tertiary)]">
                        {text.privateMeta}
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
                <a
                  href={externalLinks.courseRequests}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--primary)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Github className="h-4 w-4 text-[var(--primary)]" />
                    <span>
                      <span className="block">{text.publicAction}</span>
                      <span className="mt-0.5 block text-xs font-normal text-[var(--text-tertiary)]">
                        {text.publicMeta}
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">
                {text.publicNote}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
