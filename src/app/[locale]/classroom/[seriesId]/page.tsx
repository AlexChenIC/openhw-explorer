import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomSeriesContent } from "@/components/ClassroomSeriesContent";
import { classroomSeries, getLocalizedText, getSeriesById } from "@/data/classrooms";
import { SITE_URL } from "@/lib/site-url";

type SeriesPageProps = {
  params: Promise<{ locale: string; seriesId: string }>;
};

export function generateStaticParams() {
  return classroomSeries.flatMap((series) =>
    ["en", "zh"].map((locale) => ({
      locale,
      seriesId: series.id,
    })),
  );
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { locale, seriesId } = await params;
  const series = getSeriesById(seriesId);
  if (!series) return {};

  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const title = getLocalizedText(series.title, resolvedLocale);
  const description = getLocalizedText(series.description, resolvedLocale);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | OpenHW Explorer`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/classroom/${series.id}`,
      languages: {
        en: `${SITE_URL}/en/classroom/${series.id}`,
        zh: `${SITE_URL}/zh/classroom/${series.id}`,
      },
    },
  };
}

export default async function ClassroomSeriesPage({ params }: SeriesPageProps) {
  const { locale, seriesId } = await params;
  setRequestLocale(locale);
  const series = getSeriesById(seriesId);

  if (!series) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ClassroomSeriesContent locale={locale} series={series} />
        <Footer />
      </main>
    </div>
  );
}
