import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectRankingsSection } from "@/components/ProjectRankingsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { Footer } from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";
import { serializeJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "OpenHW Explorer - Navigate Open-Source RISC-V Hardware Projects",
    description:
      locale === "zh"
        ? "独立社区项目，帮助你探索 OpenHW 开源 RISC-V 处理器、验证环境、SoC、IP 与学习资源。"
        : "An independent community project for exploring OpenHW open-source RISC-V cores, verification tools, SoC platforms, IP, and learning resources.",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        zh: `${SITE_URL}/zh`,
      },
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenHW Explorer",
    url: SITE_URL,
    description:
      "An independent community navigator to explore the OpenHW Foundation's open-source RISC-V hardware IP projects.",
    author: {
      "@type": "Person",
      name: "Alex Chen",
      alternateName: "开源老陈",
      url: "https://github.com/AlexChenIC",
    },
    inLanguage: ["en", "zh"],
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <main className="relative z-10 min-h-full">
        <Header />
        <Hero />
        <ProjectsSection />
        <ProjectRankingsSection />
        <ResourcesSection />
        <Footer />
      </main>
    </div>
  );
}
