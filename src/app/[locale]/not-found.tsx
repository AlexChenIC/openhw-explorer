"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { Home, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4">
          <div className="text-center max-w-md">
            {/* 404 visual */}
            <div className="mb-6">
              <span className="text-7xl sm:text-8xl font-bold text-[var(--primary)]/20">404</span>
            </div>

            {/* Message */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
              {t("title")}
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">{t("description")}</p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-md shadow-[var(--primary)]/20 w-full sm:w-auto justify-center"
              >
                <Home className="w-4 h-4" />
                {t("goHome")}
              </Link>
              <Link
                href="/#projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all w-full sm:w-auto justify-center"
              >
                <Search className="w-4 h-4" />
                {t("browseProjects")}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
