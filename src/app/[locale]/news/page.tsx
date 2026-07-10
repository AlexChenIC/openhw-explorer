import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsContent } from "@/components/NewsContent";
import { features } from "@/lib/features";
import { SITE_URL } from "@/lib/site-url";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  if (!features.newsEnabled) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { locale } = await params;
  const t = await getTranslations("news");
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
      canonical: `${SITE_URL}/${locale}/news`,
      languages: {
        en: `${SITE_URL}/en/news`,
        zh: `${SITE_URL}/zh/news`,
      },
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!features.newsEnabled) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <NewsContent />
        <Footer />
      </main>
    </div>
  );
}
