import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomLessonContent } from "@/components/ClassroomLessonContent";
import {
  classroomSeries,
  getClassroomBaseUrl,
  getLessonById,
  getLocalizedText,
  getSeriesById,
} from "@/data/classrooms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

type LessonPageProps = {
  params: Promise<{ locale: string; seriesId: string; lessonId: string }>;
};

export function generateStaticParams() {
  return classroomSeries.flatMap((series) =>
    series.lessons
      .filter((lesson) => lesson.classroomId)
      .flatMap((lesson) =>
        ["en", "zh"].map((locale) => ({
          locale,
          seriesId: series.id,
          lessonId: lesson.id,
        })),
      ),
  );
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { locale, seriesId, lessonId } = await params;
  const lesson = getLessonById(seriesId, lessonId);
  if (!lesson) return {};

  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const title = getLocalizedText(lesson.title, resolvedLocale);
  const description = getLocalizedText(lesson.summary, resolvedLocale);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | OpenHW Explorer`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/classroom/${seriesId}/${lessonId}`,
      languages: {
        en: `${SITE_URL}/en/classroom/${seriesId}/${lessonId}`,
        zh: `${SITE_URL}/zh/classroom/${seriesId}/${lessonId}`,
      },
    },
  };
}

export default async function ClassroomLessonPage({ params }: LessonPageProps) {
  const { locale, seriesId, lessonId } = await params;
  const series = getSeriesById(seriesId);
  const lesson = getLessonById(seriesId, lessonId);

  if (!series || !lesson?.classroomId) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ClassroomLessonContent
          locale={locale}
          classroomBaseUrl={getClassroomBaseUrl()}
          series={series}
          lesson={lesson}
        />
        <Footer />
      </main>
    </div>
  );
}
