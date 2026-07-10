import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IndustryLandscapeContent } from "@/components/IndustryLandscapeContent";
import { SITE_URL } from "@/lib/site-url";

const metadataCopy = {
  en: {
    title: "RISC-V Industry Landscape",
    description:
      "A source-checked map of commercial RISC-V processor IP companies, silicon and compute platforms, and design and verification providers.",
  },
  zh: {
    title: "RISC-V 产业版图",
    description:
      "经过官网核对的 RISC-V 商业生态地图，覆盖处理器 IP、芯片与计算平台，以及设计和验证厂商。",
  },
} as const;

type IndustryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const copy = metadataCopy[resolvedLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `${SITE_URL}/${resolvedLocale}/resources/industry`,
      languages: {
        en: `${SITE_URL}/en/resources/industry`,
        zh: `${SITE_URL}/zh/resources/industry`,
      },
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <IndustryLandscapeContent locale={locale} />
        <Footer />
      </main>
    </div>
  );
}
