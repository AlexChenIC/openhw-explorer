import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResourceDirectoryContent } from "@/components/ResourceDirectoryContent";
import { SITE_URL } from "@/lib/site-url";

const metadataCopy = {
  en: {
    title: "Open Hardware Ecosystem & Resources",
    description:
      "Source-checked open hardware ecosystem links plus curated RISC-V specifications, OpenHW projects, design tools, verification tools, and learning resources.",
  },
  zh: {
    title: "开源硬件生态与资源导航",
    description:
      "经过官网核对的开源硬件生态入口，以及精选的 RISC-V 规范、OpenHW 项目、设计工具、验证工具和学习资料。",
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
