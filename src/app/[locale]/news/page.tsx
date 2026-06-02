import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsContent } from "@/components/NewsContent";
import { features } from "@/lib/features";

const FALLBACK_SITE_URL = "https://openhw-explorer.vercel.app";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredUrl || configuredUrl.includes("<") || configuredUrl.includes("%3C")) {
    return FALLBACK_SITE_URL;
  }

  try {
    const url = new URL(configuredUrl);
    return `${url.protocol}//${url.host}`;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

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
  const siteUrl = getSiteUrl();

  return {
    title,
    description,
    openGraph: {
      title: `${title} | OpenHW Explorer`,
      description,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/news`,
      languages: {
        en: `${siteUrl}/en/news`,
        zh: `${siteUrl}/zh/news`,
      },
    },
  };
}

export default function NewsPage() {
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
