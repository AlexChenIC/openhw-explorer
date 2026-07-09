import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, ThemeScript } from "@/lib/theme";
import { FunModeProvider } from "@/lib/fun-mode";
import { ClientObservability } from "@/components/ClientObservability";
import { FeedbackButton } from "@/components/FeedbackButton";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const DEFAULT_SITE_URL = "https://openhw-explorer.vercel.app";

function resolveSiteUrl(value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized) return DEFAULT_SITE_URL;

  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

const SITE_DESCRIPTION = {
  en: "A community-friendly navigator to explore the OpenHW Foundation's open-source RISC-V hardware IP projects, documentation, and tools.",
  zh: "一个社区构建的 OpenHW Foundation 开源 RISC-V 硬件 IP 项目导航站，涵盖处理器核心、验证工具、SoC 平台与学习资源。",
} as const;

const OG_DESCRIPTION = {
  en: "Explore OpenHW open-source RISC-V projects. Browse processor cores, verification tools, SoC platforms, and more.",
  zh: "浏览 OpenHW 开源 RISC-V 项目：处理器核心、验证工具、SoC 平台等。",
} as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: "en" | "zh" = locale === "zh" ? "zh" : "en";

  return {
    title: {
      default: "OpenHW Explorer",
      template: "%s | OpenHW Explorer",
    },
    description: SITE_DESCRIPTION[lang],
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      siteName: "OpenHW Explorer",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      url: `${SITE_URL}/${lang}`,
      title: "OpenHW Explorer",
      description: OG_DESCRIPTION[lang],
    },
    twitter: {
      card: "summary_large_image",
      title: "OpenHW Explorer",
      description: OG_DESCRIPTION[lang],
    },
    icons: {
      icon: [{ url: "/icon.svg?v=20260521", type: "image/svg+xml" }],
      shortcut: [{ url: "/icon.svg?v=20260521", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.svg?v=20260521", sizes: "180x180", type: "image/svg+xml" }],
    },
    other: {
      "theme-color": "#0B5CAB",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "zh")) {
    notFound();
  }

  // Opt this subtree into static rendering (next-intl requirement).
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="h-full font-primary scrollbar-dark">
        <ThemeProvider>
          <FunModeProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
              <FeedbackButton />
            </NextIntlClientProvider>
            <ClientObservability />
            <Analytics />
          </FunModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
