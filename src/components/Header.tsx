"use client";

import { useState } from "react";
import { Github, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/lib/routing";
import { useTheme } from "@/lib/theme";
import { features } from "@/lib/features";
import { BrandLockup } from "@/components/BrandMark";
import { localeOptions, type SiteLocale } from "@/lib/locales";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const switchLocale = (newLocale: SiteLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-dark)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center hover:opacity-90 transition-opacity">
          <BrandLockup size="sm" className="sm:h-12 sm:w-[150px] lg:h-[60px] lg:w-[186px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label={t("aria.mainNavigation")}>
          <Link
            href="/#projects"
            className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
          >
            {t("explore")}
          </Link>
          <Link
            href="/classroom"
            className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
          >
            {t("guide")}
          </Link>
          <Link
            href="/resources"
            className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
          >
            {t("resources")}
          </Link>
          {features.newsEnabled && (
            <Link
              href="/news"
              className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("news")}
            </Link>
          )}
          <Link
            href="/about"
            className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
          >
            {t("about")}
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div
            className="flex items-center gap-1.5 sm:gap-2"
            role="group"
            aria-label={t("aria.displayPreferences")}
          >
            {/* Locale options stay in one central list so future supported languages appear here automatically. */}
            <div className="relative">
              <Languages
                aria-hidden="true"
                className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-tertiary)]"
              />
              <select
                value={locale}
                onChange={(event) => switchLocale(event.target.value as SiteLocale)}
                aria-label={t("aria.languageSwitcher")}
                className="h-8 w-[96px] rounded-lg border border-[var(--border)] bg-[var(--bg-card)] py-1 pl-7 pr-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)] sm:h-9 sm:w-[116px]"
              >
                {localeOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("aria.switchToLight") : t("aria.switchToDark")}
              title={theme === "dark" ? t("aria.switchToLight") : t("aria.switchToDark")}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-1.5 transition-all hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] sm:p-2"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[var(--text-primary)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--text-primary)]" />
              )}
            </button>

          </div>

          <span className="hidden h-5 w-px bg-[var(--border)] sm:block" aria-hidden="true" />

          {/* GitHub button - desktop */}
          <a
            href="https://github.com/openhwgroup"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("aria.openGithub")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all text-sm"
          >
            <Github className="w-4 h-4 text-[var(--text-primary)]" />
            <span className="text-[var(--text-primary)] font-medium">{t("github")}</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
            aria-expanded={isMobileMenuOpen}
            className="rounded-lg p-1.5 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-subtle-hover)] hover:text-[var(--text-primary)] sm:p-2 md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden border-t border-[var(--border)] bg-[var(--bg-dark)]/95 backdrop-blur-xl"
          aria-label={t("aria.mobileNavigation")}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("explore")}
            </Link>
            <Link
              href="/classroom"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("guide")}
            </Link>
            <Link
              href="/resources"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("resources")}
            </Link>
            {features.newsEnabled && (
              <Link
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
              >
                {t("news")}
              </Link>
            )}
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("about")}
            </Link>
            <a
              href="https://github.com/openhwgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              <Github className="w-4 h-4" />
              {t("github")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
