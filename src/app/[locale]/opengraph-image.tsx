import { ImageResponse } from "next/og";

export const alt = "OpenHW Explorer — Navigate open-source RISC-V hardware projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social-share card generated at build time; no static asset to maintain.
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0b1020 0%, #0e1830 55%, #0b5cab 160%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 30,
          color: "#7fb3e8",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            background: "#0b5cab",
            border: "3px solid #7fb3e8",
          }}
        />
        RISC-V · CORE-V · Open Hardware
      </div>
      <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>OpenHW Explorer</div>
      <div style={{ fontSize: 38, color: "#a5b4c7", marginTop: 24, lineHeight: 1.4 }}>
        {zh
          ? "浏览 OpenHW 开源 RISC-V 项目：核心、验证、SoC 与学习资源"
          : "Navigate OpenHW open-source RISC-V cores, verification, SoCs, and learning resources"}
      </div>
      <div style={{ fontSize: 26, color: "#74849b", marginTop: 48 }}>
        {zh
          ? "社区项目 · 非 OpenHW Foundation 官方站点"
          : "Community project · Not an official OpenHW Foundation site"}
      </div>
    </div>,
    size,
  );
}
