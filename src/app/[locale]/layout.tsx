import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, ThemeScript } from "@/lib/theme";
import { ClientObservability } from "@/components/ClientObservability";
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

export const metadata: Metadata = {
  title: {
    default: "OpenHW Explorer",
    template: "%s | OpenHW Explorer",
  },
  description:
    "A community-friendly navigator to explore OpenHW Group's open-source RISC-V hardware IP projects, documentation, and tools.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "OpenHW Explorer",
    locale: "en_US",
    url: SITE_URL,
    title: "OpenHW Explorer",
    description:
      "Explore OpenHW open-source RISC-V projects. Browse processor cores, verification tools, SoC platforms, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenHW Explorer",
    description:
      "Explore OpenHW open-source RISC-V projects. Browse processor cores, verification tools, SoC platforms, and more.",
  },
  other: {
    "theme-color": "#0066ff",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "zh")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="h-full font-primary scrollbar-dark">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          <ClientObservability />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
