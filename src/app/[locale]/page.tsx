import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectRankingsSection } from "@/components/ProjectRankingsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { Footer } from "@/components/Footer";
import { serializeJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "OpenHW Explorer - Navigate Open-Source RISC-V Hardware Projects",
    description:
      "Explore OpenHW Group open-source RISC-V projects. Browse processor cores, verification tools, SoC platforms, IP components, and learning resources with smart filtering.",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        zh: `${SITE_URL}/zh`,
      },
    },
  };
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenHW Explorer",
    url: SITE_URL,
    description:
      "A community-friendly navigator to explore OpenHW Group's open-source RISC-V hardware IP projects.",
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
