import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContributeContent } from "@/components/ContributeContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

type ContributePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContributePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("contributePage");
  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    openGraph: {
      title: `${title} | OpenHW Explorer`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contribute`,
      languages: {
        en: `${SITE_URL}/en/contribute`,
        zh: `${SITE_URL}/zh/contribute`,
      },
    },
  };
}

export default function ContributePage() {
  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <ContributeContent />
        <Footer />
      </main>
    </div>
  );
}
