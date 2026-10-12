import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PublishedClassroomPlayer } from "@/components/PublishedClassroomPlayer";
import { getClassroomIdForLocale, getLocalizedText } from "@/data/classrooms";
import { getPublishedClassroom } from "@/data/published-classrooms";
import { getPublicClassroomIds, getPublicLessonByClassroomId } from "@/data/classroom-publication";
import { SITE_URL } from "@/lib/site-url";

type ClassroomPlayerPageProps = {
  params: Promise<{ locale: string; classroomId: string }>;
};

export function generateStaticParams() {
  return getPublicClassroomIds().flatMap((classroomId) =>
    ["en", "zh"]
      .filter((locale) => {
        const match = getPublicLessonByClassroomId(classroomId);
        return match && getClassroomIdForLocale(match.lesson, locale) === classroomId;
      })
      .map((locale) => ({ locale, classroomId })),
  );
}

export async function generateMetadata({ params }: ClassroomPlayerPageProps): Promise<Metadata> {
  const { locale, classroomId } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const classroom = getPublishedClassroom(classroomId);
  if (!classroom || !getPublicLessonByClassroomId(classroomId))
    return { robots: { index: false, follow: true } };

  const match = getPublicLessonByClassroomId(classroomId);
  const title = match ? getLocalizedText(match.lesson.title, resolvedLocale) : classroom.stage.name;
  const description = match
    ? getLocalizedText(match.lesson.summary, resolvedLocale)
    : classroom.stage.description || classroom.stage.name;

  return {
    title,
    description,
    ...(classroom.stage.releaseStage === "demo" ? { robots: { index: false, follow: true } } : {}),
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${resolvedLocale}/classroom-player/${classroomId}`,
      languages: {
        en: `${SITE_URL}/en/classroom-player/${match ? getClassroomIdForLocale(match.lesson, "en") : classroomId}`,
        zh: `${SITE_URL}/zh/classroom-player/${match ? getClassroomIdForLocale(match.lesson, "zh") : classroomId}`,
      },
    },
  };
}

export default async function ClassroomPlayerPage({ params }: ClassroomPlayerPageProps) {
  const { locale, classroomId } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const classroom = getPublishedClassroom(classroomId);

  if (!classroom || !getPublicLessonByClassroomId(classroomId)) {
    redirect(`/${resolvedLocale}/classroom`);
  }

  const match = getPublicLessonByClassroomId(classroomId);
  const localizedId = match && getClassroomIdForLocale(match.lesson, resolvedLocale);
  if (localizedId && localizedId !== classroomId) {
    redirect(`/${resolvedLocale}/classroom-player/${localizedId}`);
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
