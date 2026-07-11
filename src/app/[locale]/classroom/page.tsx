import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClassroomContent } from "@/components/ClassroomContent";
import { SITE_URL } from "@/lib/site-url";

type ClassroomPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataCopy = {
  en: {
    title: "OpenHW Classroom",
    description:
      "A learning hub for future source-grounded, human-reviewed OpenHW and RISC-V technical courses.",
  },
  zh: {
    title: "OpenHW 交互式课堂",
    description: "为未来经过人工核对、基于一手资料的 OpenHW 与 RISC-V 技术课程准备的学习中心。",
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
  setRequestLocale(locale);

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
