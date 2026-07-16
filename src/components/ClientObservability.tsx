"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/observability";

const MAX_REPORTED_ERRORS = 5;

function getSourceKind(filename: string): "same-origin" | "external" | "unknown" {
  if (!filename) return "unknown";
  try {
    return new URL(filename, window.location.href).origin === window.location.origin
      ? "same-origin"
      : "external";
  } catch {
    return "unknown";
  }
}

export function ClientObservability() {
  useEffect(() => {
    let reportedErrors = 0;

    const canReport = () => reportedErrors < MAX_REPORTED_ERRORS;
    const markReported = () => {
      reportedErrors += 1;
    };

    const handleError = (event: ErrorEvent) => {
      if (!canReport()) return;
      markReported();

      trackEvent("client_error", {
        kind: "runtime-error",
        sourceKind: getSourceKind(event.filename),
        line: event.lineno || 0,
        column: event.colno || 0,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!canReport()) return;
      markReported();

      trackEvent("client_unhandled_rejection", {
        kind: "unhandled-rejection",
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
