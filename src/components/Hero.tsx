"use client";

import { Compass, Search, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * SVG 噪声纹理 - 使用 feTurbulence 生成
 * 轻量级，不影响性能
 */
function NoiseTexture() {
  return (
    <svg className="hero-noise" width="100%" height="100%">
      <defs>
        <filter id="hero-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#hero-noise-filter)" opacity="0.4" />
    </svg>
  );
}

/**
 * Hero 动态背景组件
 * 包含：渐变漂移 + 多层光晕 + 噪声纹理 + 网格线条
 */
function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      {/* 渐变漂移层 */}
      <div className="hero-gradient" />

      {/* 光晕层 */}
      <div className="hero-glow" />
      <div className="hero-glow-secondary" />
      <div className="hero-glow-tertiary" />

      {/* 微弱网格 */}
      <div className="hero-grid" />

      {/* 噪声纹理 */}
      <NoiseTexture />

      {/* 底部渐变过渡 */}
      <div className="hero-fade" />
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col items-center gap-6 sm:gap-8 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-20 overflow-hidden">
      {/* 动态背景 */}
      <HeroBackground />

      {/* 内容层 - z-index 确保在背景之上 */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-tertiary)]/10 border border-[var(--text-tertiary)]/25 backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span className="text-[var(--text-secondary)] text-[13px] font-medium">{t("badge")}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[var(--text-primary)] text-center leading-tight">
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] text-center leading-[1.7] max-w-[520px]">
          {t("subtitle")}
          <br className="hidden md:block" />
          {t("subtitleLine2")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30"
          >
            <Search className="w-[18px] h-[18px] text-white" />
            <span className="text-white text-base font-semibold">{t("exploreProjects")}</span>
          </a>
          <a
            href="#resources"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-card)] hover:border-[var(--text-tertiary)] transition-all backdrop-blur-sm"
          >
            <BookOpen className="w-[18px] h-[18px] text-[var(--text-primary)]" />
            <span className="text-[var(--text-primary)] text-base font-semibold">
              {t("browseDocs")}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
