"use client";

import { ArrowRight, BookOpen, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";

const cardStyles = [
  {
    icon: GraduationCap,
    accent: "var(--primary)",
    border: "border-[var(--primary)]/30",
    bg: "bg-[var(--primary)]/8",
  },
  {
    icon: BookOpen,
    accent: "var(--green)",
    border: "border-[var(--green)]/30",
    bg: "bg-[var(--green)]/8",
  },
  {
    icon: Trophy,
    accent: "var(--orange)",
    border: "border-[var(--orange)]/30",
    bg: "bg-[var(--orange)]/8",
  },
] as const;

export function ResourcesSection() {
  const t = useTranslations("resources");

  const cards = [
    {
      title: t("cards.classroom.title"),
      description: t("cards.classroom.description"),
      href: "/contribute#classroom",
      cta: t("cards.classroom.cta"),
    },
    {
      title: t("cards.pathway.title"),
      description: t("cards.pathway.description"),
      href: "/contribute#contribute-center",
      cta: t("cards.pathway.cta"),
    },
    {
      title: t("cards.community.title"),
      description: t("cards.community.description"),
      href: "/#rankings",
      cta: t("cards.community.cta"),
    },
  ] as const;

  return (
    <section id="resources" className="section-resources py-12 sm:py-16 scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t("kicker")}
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-2">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {cards.map((card, index) => {
            const style = cardStyles[index];
            const Icon = style.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group card-glow rounded-xl border p-5 ${style.border} ${style.bg} hover:translate-y-[-2px] transition-all`}
              >
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-lg mb-3"
                  style={{ backgroundColor: `${style.accent}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: style.accent }} />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 min-h-[64px]">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] group-hover:gap-2 transition-all">
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
