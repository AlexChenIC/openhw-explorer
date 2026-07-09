import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResourceDirectoryContent } from "@/components/ResourceDirectoryContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

const metadataCopy = {
  en: {
    title: "Resources",
    description:
      "Curated RISC-V and open hardware resources: specifications, OpenHW projects, HDLs, toolchains, simulators, design tools, verification tools, and communities.",
  },
  zh: {
    title: "资源库",
    description:
      "精选 RISC-V 与开源硬件资源：规范、OpenHW 项目、HDL、工具链、模拟器、设计工具、验证工具和社区。",
  },
} as const;

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const copy = metadataCopy[resolvedLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `${SITE_URL}/${resolvedLocale}/resources`,
      languages: {
        en: `${SITE_URL}/en/resources`,
        zh: `${SITE_URL}/zh/resources`,
      },
    },
  };
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ResourceDirectoryContent locale={locale} />
        <Footer />
      </main>
    </div>
  );
}
