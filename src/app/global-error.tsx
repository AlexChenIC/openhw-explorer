"use client";

// Root-level fallback: replaces the entire root layout when it crashes,
// so it must render its own <html>/<body> and stay dependency-free.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1020",
          color: "#e7ecf4",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Noto Sans SC', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420, padding: 24 }}>
          <p style={{ fontSize: 64, fontWeight: 700, opacity: 0.2, margin: 0 }}>500</p>
          <h1 style={{ fontSize: 24, margin: "12px 0" }}>Something went wrong / 页面出错了</h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            OpenHW Explorer hit an unexpected error. / 遇到了意外错误，请重试。
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#0b5cab",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again / 重试
          </button>
        </div>
      </body>
    </html>
  );
}
