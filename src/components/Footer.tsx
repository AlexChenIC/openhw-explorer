"use client";

import { Github, ExternalLink, Linkedin, Scale } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { externalLinks } from "@/data/external-links";
import { BrandLockup } from "@/components/BrandMark";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="section-footer py-10 sm:py-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:gap-10">
          <div>
            <BrandLockup size="md" />
            <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
              {t("projectNote")}
            </p>
            <nav
              aria-label={t("linksLabel")}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <Link
                href="/license"
                className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <Scale className="w-4 h-4" />
                <span>{t("licensing")}</span>
              </Link>
              <a
                href={externalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t("openHWGitHub")}</span>
              </a>
              <a
                href={externalLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t("officialWebsite")}</span>
              </a>
              <a
                href={externalLinks.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t("documentation")}</span>
              </a>
            </nav>
          </div>

          <div className="border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs font-semibold text-[var(--primary)]">{t("creatorLabel")}</p>
            <div className="mt-3 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-sm font-bold text-white"
              >
                AC
              </span>
              <div className="min-w-0">
                <a
                  href={externalLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--primary)]"
                >
                  {t("creatorName")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  {t("personalTagline")}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#0a66c2] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#084f96]"
              >
                <Linkedin className="h-4 w-4" />
                <span>{t("connectLinkedIn")}</span>
              </a>
              <Link
                href="/about#author"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-[var(--border)] px-3.5 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/45 hover:text-[var(--primary)]"
              >
                {t("aboutCreator")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border)] pt-5 text-xs text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between">
          <span>{t("independentNote")}</span>
          <span>{t("communityNote")}</span>
        </div>
      </div>
    </footer>
  );
}
