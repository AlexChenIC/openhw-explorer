import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomContent } from "@/components/ClassroomContent";
import { SITE_URL } from "@/lib/site-url";
import { features } from "@/lib/features";
import { publishedNewsletterUsername } from "@/lib/newsletter";

type ClassroomPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataCopy = {
  en: {
    title: "OpenHW Learning Hub",
    description:
      "Short, source-checked OpenHW lessons, original technical deep dives, and selected public learning material.",
  },
  zh: {
    title: "OpenHW 学习中心",
    description: "从来源可追溯的 OpenHW 短课开始，逐步进入原创技术深度课和精选公开学习资料。",
  },
} as const;

export async function generateMetadata({ params }: ClassroomPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const copy = metadataCopy[resolvedLocale];

  const description = features.publicPreviewEnabled
    ? resolvedLocale === "zh"
      ? "三项中英文学习体验：OpenHW Foundation、CORE-V 内核命名与 CVA6 项目导览。"
      : "Three bilingual learning experiences: the OpenHW Foundation, CORE-V core names, and a CVA6 project guide."
    : copy.description;

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
