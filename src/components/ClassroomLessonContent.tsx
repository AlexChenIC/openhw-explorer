import {
  ArrowRight,
  BookOpen,
  Clock3,
  ExternalLink,
  Layers3,
  ListChecks,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/routing";
import {
  getClassroomIdForLocale,
  getLocalizedText,
  type ClassroomLesson,
  type ClassroomSeries,
} from "@/data/classrooms";
import { getPublishedClassroom } from "@/data/published-classrooms";
import { PublishedClassroomPlayer } from "@/components/PublishedClassroomPlayer";

const copy = {
  en: {
    back: "Back to series",
    preview: "Prototype classroom",
    fallbackLanguage: "This preview is currently available in English only.",
    openStandalone: "Open standalone classroom",
    outcome: "Learning outcome",
    sources: "Source anchors",
    minutes: "min",
    slides: "slides",
    quiz: "quiz",
    notesTitle: "Prototype status",
    notes:
      "This AI-assisted prototype is retained to demonstrate the classroom format. It is not a completed, fully human-reviewed course and is not reviewed or endorsed by OpenHW Foundation. Use the cited official sources for authoritative technical details.",
  },
  zh: {
    back: "返回课程系列",
    preview: "原型课堂",
    fallbackLanguage: "这节原型样课目前只有英文版本。",
    openStandalone: "打开独立课堂",
    outcome: "学习目标",
    sources: "资料锚点",
    minutes: "分钟",
    slides: "页 slide",
    quiz: "题 quiz",
    notesTitle: "原型状态说明",
    notes:
      "这节 AI 辅助生成的原型样课被保留下来用于展示课堂形式，并不代表课程已经完成或通过完整人工审核，也未经 OpenHW Foundation 官方审校或背书。权威技术细节请以课程列出的一手资料为准。",
  },
} as const;

type ClassroomLessonContentProps = {
  locale: string;
  classroomBaseUrl: string;
  series: ClassroomSeries;
  lesson: ClassroomLesson;
};

export function ClassroomLessonContent({
  locale,
  classroomBaseUrl,
  series,
  lesson,
}: ClassroomLessonContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const classroomId = getClassroomIdForLocale(lesson, resolvedLocale);
  const publishedClassroom = classroomId ? getPublishedClassroom(classroomId) : null;
  const usesFallbackLanguage = Boolean(
    classroomId && lesson.classroomIds && !lesson.classroomIds[resolvedLocale],
  );
  const lessonUrl = classroomId
    ? `/${resolvedLocale}/classroom-player/${classroomId}`
    : classroomBaseUrl;

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <Link
            href={`/classroom/${series.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            {t.back}
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--orange)]/25 bg-[var(--orange)]/10 px-3 py-1 text-xs font-semibold text-[var(--orange)]">
              <PlayCircle className="h-3.5 w-3.5" />
              {t.preview}
            </div>
            <p className="text-sm font-semibold text-[var(--text-tertiary)]">
              {getLocalizedText(series.title, resolvedLocale)}
            </p>
            <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
              {getLocalizedText(lesson.title, resolvedLocale)}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
              {getLocalizedText(lesson.summary, resolvedLocale)}
            </p>
            {usesFallbackLanguage && (
              <p className="mt-3 inline-flex rounded-md border border-[var(--orange)]/25 bg-[var(--orange)]/10 px-3 py-2 text-sm font-medium text-[var(--orange)]">
                {t.fallbackLanguage}
              </p>
            )}
          </div>

          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
            <div className="grid grid-cols-3 gap-2 text-xs text-[var(--text-tertiary)]">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <Clock3 className="mb-2 h-4 w-4 text-[var(--primary)]" />
                {lesson.durationMinutes} {t.minutes}
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <Layers3 className="mb-2 h-4 w-4 text-[var(--primary)]" />
                {lesson.slideCount} {t.slides}
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                <ListChecks className="mb-2 h-4 w-4 text-[var(--primary)]" />
                {lesson.quizCount} {t.quiz}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  <ShieldCheck className="h-4 w-4" />
                  {t.outcome}
                </div>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  {getLocalizedText(lesson.outcome, resolvedLocale)}
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  <BookOpen className="h-4 w-4" />
                  {t.sources}
                </div>
                <div className="flex flex-wrap gap-2">
                  {lesson.sourceRefs.map((source) => (
                    <span
                      key={source}
                      className="rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-2 py-1 text-xs text-[var(--text-secondary)]"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {publishedClassroom && (
              <a
                href={lessonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                {t.openStandalone}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </aside>
        </section>

        {publishedClassroom ? (
          <PublishedClassroomPlayer classroom={publishedClassroom} locale={resolvedLocale} />
        ) : (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-[var(--text-secondary)] shadow-[var(--card-shadow)]">
            {resolvedLocale === "zh"
              ? "这节课的公开发布包尚未同步到 OpenHW Explorer。"
              : "The public release package for this lesson has not been synced into OpenHW Explorer yet."}
          </section>
        )}

        <section className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t.notesTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{t.notes}</p>
        </section>
      </div>
    </div>
  );
}
