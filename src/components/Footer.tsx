"use client";

import { Github, ExternalLink, Linkedin, Scale } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { externalLinks } from "@/data/external-links";
import { BrandLockup } from "@/components/BrandMark";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="section-footer py-6 sm:py-7">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <BrandLockup size="sm" />
            <nav
              aria-label={t("linksLabel")}
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5"
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

          <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {t("creatorName")}
            </span>
            <a
              href={externalLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--linkedin)] transition-colors hover:text-[var(--linkedin-hover)]"
            >
              <Linkedin className="h-4 w-4" />
              <span>{t("linkedin")}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
