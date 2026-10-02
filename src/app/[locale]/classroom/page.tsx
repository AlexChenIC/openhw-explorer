import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomContent } from "@/components/ClassroomContent";
import { SITE_URL } from "@/lib/site-url";
import { publishedNewsletterUsername } from "@/lib/newsletter";

type ClassroomPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataCopy = {
  en: {
    title: "OpenHW Learning Hub",
    description:
      "Interactive OpenHW lessons and project guides, with slides, narration, exercises and primary-source references.",
  },
  zh: {
    title: "OpenHW 学习园地",
    description: "通过交互式课程与项目导览学习 OpenHW，结合幻灯片、讲解、练习及一手资料。",
  },
} as const;

export async function generateMetadata({ params }: ClassroomPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const copy = metadataCopy[resolvedLocale];

  const description = copy.description;

  return {
    title: copy.title,
    description,
    openGraph: {
      title: `${copy.title} | OpenHW Explorer`,
      description,
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
  setRequestLocale(locale);
  const newsletterUsername = publishedNewsletterUsername(
    process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME,
  );

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ClassroomContent locale={locale} newsletterUsername={newsletterUsername} />
        <Footer />
      </main>
    </div>
  );
}
