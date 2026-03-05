import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

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

export default function AboutPage() {
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

// Separate client component import not needed - this is a server component page
async function AboutContent() {
  const t = await getTranslations("about");

  return (
    <div className="page-shell">
      <div className="page-container max-w-3xl">
        {/* Page Title */}
        <div className="page-hero">
          <div className="page-badge page-badge-primary">{t("badge")}</div>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* What is this */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("whatIsThis.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{t("whatIsThis.p1")}</p>
          <p className="text-[var(--text-secondary)] leading-relaxed">{t("whatIsThis.p2")}</p>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-amber-400 mb-3">{t("disclaimer.title")}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{t("disclaimer.content")}</p>
        </section>

        {/* Features */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t("features.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(["browse", "filter", "detail", "i18n"] as const).map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-subtle)]"
              >
                <span className="text-[var(--primary)] text-lg mt-0.5">
                  {key === "browse" && "📂"}
                  {key === "filter" && "🔍"}
                  {key === "detail" && "📄"}
                  {key === "i18n" && "🌐"}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)] mb-0.5">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                    {t(`features.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Author */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("author.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{t("author.bio")}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/AlexChenIC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/junchaocheneu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-primary)] font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all"
            >
              {t("author.connectLinkedIn")}
            </a>
          </div>
        </section>

        {/* Contribute */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("contribute.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {t("contribute.content")}
          </p>
          <a
            href="https://github.com/AlexChenIC/openhw-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-md shadow-[var(--primary)]/20"
          >
            {t("contribute.cta")}
          </a>
        </section>
      </div>
    </div>
  );
}
