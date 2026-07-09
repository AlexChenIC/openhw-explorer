"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import { trackEvent } from "@/lib/observability";

// This boundary can render when the next-intl provider itself has failed,
// so copy is inlined bilingually instead of using useTranslations.
function isZh(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.startsWith("/zh");
}

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    trackEvent("page_error", {
      message: (error.message || "unknown").slice(0, 180),
      digest: error.digest || "none",
      path: typeof window === "undefined" ? "unknown" : window.location.pathname,
    });
  }, [error]);

  const zh = isZh();

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-screen flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <span className="text-7xl sm:text-8xl font-bold text-[var(--primary)]/20">500</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
            {zh ? "页面出错了" : "Something went wrong"}
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
            {zh
              ? "这个页面遇到了意外错误。你可以重试，或返回首页。"
              : "This page hit an unexpected error. You can retry, or head back home."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-md shadow-[var(--primary)]/20 w-full sm:w-auto justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              {zh ? "重试" : "Try again"}
            </button>
            <a
              href={zh ? "/zh" : "/en"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all w-full sm:w-auto justify-center"
            >
              <Home className="w-4 h-4" />
              {zh ? "返回首页" : "Go home"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
