"use client";

import { Github, ExternalLink, Heart, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { externalLinks } from "@/data/resources";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="section-footer py-10 sm:py-12">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col gap-8">
          {/* Top row: Brand + Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                  <span className="text-white text-xs font-bold">OH</span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  OpenHW Explorer
                </span>
              </div>
              <span className="text-xs text-[var(--text-tertiary)] ml-[38px]">
                {tc("communityProject")}
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>{t("linkedin")}</span>
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
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border)]" />

          {/* Bottom row: Credit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-1">
              <span>{t("madeWithPrefix")}</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>{t("madeWithSuffix")}</span>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1.5 text-center sm:text-right">
              <span>by {t("by")}</span>
              <span className="text-[11px] sm:text-xs text-[var(--text-secondary)]">
                {t("personalTagline")}
              </span>
              <a
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>{t("connectLinkedIn")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
