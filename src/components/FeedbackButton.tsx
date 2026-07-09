"use client";

import { MessageSquare } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { externalLinks } from "@/data/external-links";
import { trackEvent } from "@/lib/observability";

function getCurrentUrl() {
  if (typeof window === "undefined") return "unknown";
  return `${window.location.origin}${window.location.pathname}${window.location.search}`;
}

export function FeedbackButton() {
  const t = useTranslations("feedback");
  const locale = useLocale();

  const handleClick = () => {
    const url = getCurrentUrl();
    trackEvent("feedback_opened", {
      path: typeof window === "undefined" ? "unknown" : window.location.pathname,
      locale,
    });

    const params = new URLSearchParams({
      title: t("issueTitle"),
      body: t("issueBody", { url }),
    });

    window.open(`${externalLinks.feedbackIssues}?${params.toString()}`, "_blank", "noopener");
  };

  return (
    <button
      type="button"
      aria-label={t("ariaLabel")}
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 text-sm font-semibold text-[var(--text-primary)] shadow-lg shadow-black/10 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-dark)] sm:bottom-5 sm:right-5 sm:px-4"
    >
      <MessageSquare className="h-4 w-4" />
      <span className="hidden sm:inline">{t("button")}</span>
    </button>
  );
}
