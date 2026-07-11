import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PublishedClassroomPlayer } from "@/components/PublishedClassroomPlayer";
import { classroomSeries, getLocalizedText, lessonUsesClassroomId } from "@/data/classrooms";
import { getPublishedClassroom, getPublishedClassroomIds } from "@/data/published-classrooms";
import { SITE_URL } from "@/lib/site-url";

type ClassroomPlayerPageProps = {
  params: Promise<{ locale: string; classroomId: string }>;
};

function getLessonByClassroomId(classroomId: string) {
  for (const series of classroomSeries) {
    const lesson = series.lessons.find((item) => lessonUsesClassroomId(item, classroomId));
    if (lesson) return { lesson, series };
  }

  return null;
}

export function generateStaticParams() {
  return getPublishedClassroomIds().flatMap((classroomId) =>
    ["en", "zh"].map((locale) => ({
      locale,
      classroomId,
    })),
  );
}

export async function generateMetadata({ params }: ClassroomPlayerPageProps): Promise<Metadata> {
  const { locale, classroomId } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const classroom = getPublishedClassroom(classroomId);
  if (!classroom) return {};

  const match = getLessonByClassroomId(classroomId);
  const title = match ? getLocalizedText(match.lesson.title, resolvedLocale) : classroom.stage.name;
  const description = match
    ? getLocalizedText(match.lesson.summary, resolvedLocale)
    : classroom.stage.description || classroom.stage.name;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${resolvedLocale}/classroom-player/${classroomId}`,
      languages: {
        en: `${SITE_URL}/en/classroom-player/${classroomId}`,
        zh: `${SITE_URL}/zh/classroom-player/${classroomId}`,
      },
    },
  };
}

export default async function ClassroomPlayerPage({ params }: ClassroomPlayerPageProps) {
  const { locale, classroomId } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const classroom = getPublishedClassroom(classroomId);

  if (!classroom) {
    redirect(`/${resolvedLocale}/classroom`);
  }

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <div className="page-shell">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <PublishedClassroomPlayer classroom={classroom} locale={resolvedLocale} standalone />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
