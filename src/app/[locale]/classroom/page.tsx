import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomContent } from "@/components/ClassroomContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

type ClassroomPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataCopy = {
  en: {
    title: "OpenHW Classroom",
    description:
      "Source-grounded technical micro-courses for learning OpenHW projects, starting with a pilot CVA6 course path.",
  },
  zh: {
    title: "OpenHW 小课堂",
    description: "面向 OpenHW 项目的精品技术微课程，当前先以 CVA6 课程线作为试发布样板。",
  },
} as const;

export async function generateMetadata({ params }: ClassroomPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const copy = metadataCopy[resolvedLocale];

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: `${copy.title} | OpenHW Explorer`,
      description: copy.description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/classroom`,
      languages: {
        en: `${SITE_URL}/en/classroom`,
        zh: `${SITE_URL}/zh/classroom`,
      },
    },
  };
}

export default async function ClassroomPage({ params }: ClassroomPageProps) {
  const { locale } = await params;

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ClassroomContent locale={locale} />
        <Footer />
      </main>
    </div>
  );
}
