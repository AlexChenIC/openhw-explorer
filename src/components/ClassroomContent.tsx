import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Headphones,
  Languages,
  PlayCircle,
  Route,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  classroomSeries,
  getFeaturedLesson,
  getLocalizedText,
} from "@/data/classrooms";

const copy = {
  en: {
    eyebrow: "OpenHW Classroom · Public preview",
    title: "Explore the classroom format and the roadmap behind it",
    subtitle:
      "Two selected prototype lessons remain online for evaluation. The CVA6 series also exposes its planned nine-unit structure while the production lessons are rebuilt with direct human review.",
    previewLabel: "Prototype lesson",
    openSeries: "View series and roadmap",
    ready: "sample lesson",
    units: "planned units",
    cva6Languages: "English and Chinese sample",
    englishOnly: "English sample",
    transparencyTitle: "What is public today",
    transparencyBody:
      "These lessons were created during the AI-assisted prototyping phase and are kept to demonstrate the interaction and visual format. They are not presented as completed or fully human-reviewed courses.",
    standardsEyebrow: "Production standard",
    standardsTitle: "What the rebuilt lessons must pass",
    standards: [
      {
        title: "Source-grounded",
        body: "Important claims trace to official documentation, code, or another clearly identified primary source.",
      },
      {
        title: "Human-reviewed",
        body: "Alex reviews technical depth, teaching structure, examples, and learning outcomes before formal publication.",
      },
      {
        title: "Comfortable to follow",
        body: "Narration pace, pauses, slide density, diagrams, and quizzes work as one learning experience.",
      },
    ],
  },
  zh: {
    eyebrow: "OpenHW 交互式课堂 · 公开预览",
    title: "先体验课堂形式，也能看到未来的课程路线",
    subtitle:
      "目前保留两个系列各一节原型样课，用于展示交互和视觉效果。CVA6 同时公开计划中的九个 Unit 框架，后续正式课程将由人工参与重新制作和核对。",
    previewLabel: "原型样课",
    openSeries: "查看系列与课程框架",
    ready: "节样课",
    units: "个规划 Unit",
    cva6Languages: "中英文样课",
    englishOnly: "英文样课",
    transparencyTitle: "目前公开的内容是什么",
    transparencyBody:
      "这些样课来自 AI 辅助原型阶段，保留的目的是展示交互方式和视觉形式。它们不代表课程已经完成，也不应被理解为已经通过完整人工技术审校。",
    standardsEyebrow: "正式发布标准",
    standardsTitle: "重新制作的课程需要通过这些检查",
    standards: [
      {
        title: "依据可以追溯",
        body: "重要判断必须能够追溯到官方文档、代码或明确标出的其他一手来源。",
      },
      {
        title: "由人工完成审核",
        body: "Alex 会在正式发布前检查技术深度、教学结构、示例和实际学习目标。",
      },
      {
        title: "完整体验足够舒适",
        body: "讲解速度、停顿、每页信息密度、图表和测验需要共同构成可使用的学习体验。",
      },
    ],
  },
} as const;

const standardIcons = [FileCheck2, BookOpenCheck, Headphones] as const;

type ClassroomContentProps = { locale: string };

export function ClassroomContent({ locale }: ClassroomContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const text = copy[resolvedLocale];

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-5xl py-6 lg:py-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
            <GraduationCap className="h-3.5 w-3.5" />
            {text.eyebrow}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {text.title}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {text.subtitle}
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {classroomSeries.map((series) => {
            const featuredLesson = getFeaturedLesson(series);
            const isCva6 = series.id === "cva6-from-zero";

            return (
              <article
                key={series.id}
                className="flex h-full flex-col rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--card-shadow)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--orange)]/25 bg-[var(--orange)]/10 px-3 py-1 text-xs font-semibold text-[var(--orange)]">
                    <PlayCircle className="h-3.5 w-3.5" />
                    {text.previewLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-tertiary)]">
                    <Languages className="h-3.5 w-3.5" />
                    {isCva6 ? text.cva6Languages : text.englishOnly}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">
                  {getLocalizedText(series.title, resolvedLocale)}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {getLocalizedText(series.description, resolvedLocale)}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="border-t border-[var(--border)] pt-3">
                    <PlayCircle className="h-4 w-4 text-[var(--primary)]" />
                    <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">1</div>
                    <div className="text-xs text-[var(--text-tertiary)]">{text.ready}</div>
                  </div>
                  <div className="border-t border-[var(--border)] pt-3">
                    <Route className="h-4 w-4 text-[var(--primary)]" />
                    <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                      {series.units.length}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)]">{text.units}</div>
                  </div>
                  <div className="border-t border-[var(--border)] pt-3">
                    <Languages className="h-4 w-4 text-[var(--primary)]" />
                    <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                      {isCva6 ? "EN / 中文" : "EN"}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)]">
                      {isCva6 ? text.cva6Languages : text.englishOnly}
                    </div>
                  </div>
                </div>

                {featuredLesson && (
                  <Link
                    href={`/classroom/${series.id}`}
                    className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
                  >
                    {text.openSeries}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </section>

        <section className="border-l-2 border-[var(--orange)] bg-[var(--bg-subtle)] px-6 py-7">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {text.transparencyTitle}
          </h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-[var(--text-secondary)]">
            {text.transparencyBody}
          </p>
        </section>

        <section className="mb-4 border-t border-[var(--border)] py-10">
          <p className="text-xs font-semibold text-[var(--primary)]">{text.standardsEyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
            {text.standardsTitle}
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {text.standards.map((item, index) => {
              const Icon = standardIcons[index] ?? CheckCircle2;
              return (
                <article key={item.title} className="border-t border-[var(--border)] pt-5">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                  <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
