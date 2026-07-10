import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  GitPullRequest,
  GraduationCap,
  Route,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/routing";
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

// Separate client component import not needed - this is a server component page
async function AboutContent() {
  const t = await getTranslations("about");
  const contributionSteps = [
    { key: "learn", Icon: GraduationCap },
    { key: "choose", Icon: Route },
    { key: "prepare", Icon: BookOpen },
    { key: "ship", Icon: GitPullRequest },
  ] as const;

  return (
    <div className="page-shell">
      <div className="page-container max-w-5xl">
        {/* Page Title */}
        <div className="page-hero">
          <div className="page-badge page-badge-primary">{t("badge")}</div>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* What is this */}
        <section
          id="author"
          className="scroll-mt-24 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("whatIsThis.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{t("whatIsThis.p1")}</p>
          <p className="text-[var(--text-secondary)] leading-relaxed">{t("whatIsThis.p2")}</p>
        </section>

        {/* Disclaimer */}
        <section className="border border-amber-400/30 bg-amber-500/5 rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("disclaimer.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{t("disclaimer.content")}</p>
        </section>

        {/* Privacy */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {t("privacy.title")}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{t("privacy.content")}</p>
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
        <section
          id="contribute"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 scroll-mt-24"
        >
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
              <GitPullRequest className="h-3.5 w-3.5" />
              {t("contribute.badge")}
            </div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              {t("contribute.title")}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {t("contribute.content")}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            {contributionSteps.map((item, index) => {
              const Icon = item.Icon;
              return (
                <article
                  key={item.key}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-tertiary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    {t(`contribute.steps.${item.key}.title`)}
                  </h3>
                  <p className="text-xs leading-6 text-[var(--text-tertiary)]">
                    {t(`contribute.steps.${item.key}.desc`)}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {t("contribute.resourcesTitle")}
              </h3>
              <p className="mt-1 text-xs leading-6 text-[var(--text-tertiary)]">
                {t("contribute.resourcesDesc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/classroom"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                {t("contribute.classroomCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://docs.openhwgroup.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)]"
              >
                {t("contribute.docsCta")}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
