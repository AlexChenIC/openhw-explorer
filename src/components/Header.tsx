"use client";

import { useState } from "react";
import { Github, Menu, X, Sun, Moon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/lib/routing";
import { useTheme } from "@/lib/theme";
import { features } from "@/lib/features";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const switchLocale = (newLocale: "en" | "zh") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-dark)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo - clickable back to home */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/25">
            <span className="text-white font-bold text-sm">OH</span>
          </div>
          <span className="text-[var(--text-primary)] text-lg font-semibold tracking-tight">
            {t("title")}
          </span>
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
            href="/contribute"
            className="px-3.5 py-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
          >
            {t("guide")}
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
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div
            className="flex rounded-md border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
            role="group"
            aria-label={t("aria.languageSwitcher")}
          >
            <button
              onClick={() => switchLocale("zh")}
              aria-label={t("aria.switchToChinese")}
              aria-pressed={locale === "zh"}
              className={`px-2.5 py-1.5 text-xs font-medium transition-all ${
                locale === "zh"
                  ? "text-white bg-[var(--primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              CN
            </button>
            <button
              onClick={() => switchLocale("en")}
              aria-label={t("aria.switchToEnglish")}
              aria-pressed={locale === "en"}
              className={`px-2.5 py-1.5 text-xs font-medium transition-all ${
                locale === "en"
                  ? "text-white bg-[var(--primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("aria.switchToLight") : t("aria.switchToDark")}
            className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[var(--text-primary)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-primary)]" />
            )}
          </button>

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
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] transition-all"
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
              href="/contribute"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] rounded-lg transition-all"
            >
              {t("guide")}
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
