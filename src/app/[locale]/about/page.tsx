import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BookOpenCheck,
  ExternalLink,
  FileCheck2,
  Linkedin,
  LockKeyhole,
  Network,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site-url";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("about");
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
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        zh: `${SITE_URL}/zh/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <AboutContent />
        <Footer />
      </main>
    </div>
  );
}

async function AboutContent() {
  const t = await getTranslations("about");
  const curationPrinciples = [
    { key: "sources", Icon: FileCheck2 },
    { key: "learning", Icon: BookOpenCheck },
    { key: "context", Icon: Network },
  ] as const;

  return (
    <div className="page-shell">
      <div className="page-container max-w-5xl">
        <div className="page-hero">
          <div className="page-badge page-badge-primary">{t("badge")}</div>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <section className="grid gap-7 border-y border-[var(--border)] py-9 sm:py-11 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold text-[var(--primary)]">{t("purpose.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {t("purpose.title")}
            </h2>
          </div>
          <div className="max-w-2xl space-y-4 text-[var(--text-secondary)] leading-7">
            <p>{t("purpose.p1")}</p>
            <p>{t("purpose.p2")}</p>
          </div>
        </section>

        <section className="py-9 sm:py-11">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[var(--primary)]">{t("approach.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {t("approach.title")}
            </h2>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">{t("approach.intro")}</p>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {curationPrinciples.map(({ key, Icon }) => (
              <article key={key} className="border-t border-[var(--border)] pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                  {t(`approach.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {t(`approach.${key}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-y border-[var(--border)] py-9 sm:py-11 md:grid-cols-2 md:gap-12">
          <article>
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
              {t("disclaimer.title")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {t("disclaimer.content")}
            </p>
          </article>
          <article>
            <LockKeyhole className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
              {t("privacy.title")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {t("privacy.content")}
            </p>
          </article>
        </section>

        <section
          id="author"
          className="scroll-mt-24 py-9 sm:py-11"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[var(--primary)]">{t("author.eyebrow")}</p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                {t("author.title")}
              </h2>
              <p className="mt-3 leading-7 text-[var(--text-secondary)]">{t("author.bio")}</p>
            </div>
            <a
              href="https://www.linkedin.com/in/junchaocheneu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 w-fit items-center gap-2 rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#084f96]"
            >
              <Linkedin className="h-4 w-4" />
              {t("author.connectLinkedIn")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
