"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/observability";

const MAX_REPORTED_ERRORS = 5;

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

function getRejectionMessage(reason: unknown): string {
  if (typeof reason === "string") return reason;
  if (reason instanceof Error) return reason.message;
  try {
    return JSON.stringify(reason);
  } catch (error) {
    return "unknown rejection";
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
        message: truncate(event.message || "unknown error", 180),
        source: truncate(event.filename || "unknown source", 120),
        line: event.lineno || 0,
        column: event.colno || 0,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!canReport()) return;
      markReported();

      trackEvent("client_unhandled_rejection", {
        message: truncate(getRejectionMessage(event.reason), 180),
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
