"use client";

import { track } from "@vercel/analytics";

type TrackValue = string | number | boolean;

type TrackPayload = Record<string, string | number | boolean | null | undefined>;

function sanitizePayload(payload?: TrackPayload): Record<string, TrackValue> | undefined {
  if (!payload) return undefined;

  const sanitized: Record<string, TrackValue> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
      continue;
    }
    sanitized[key] = String(value);
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

export function trackEvent(eventName: string, payload?: TrackPayload) {
  if (typeof window === "undefined") return;

  try {
    const sanitizedPayload = sanitizePayload(payload);
    track(eventName, sanitizedPayload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[observability] failed to track event: ${eventName}`, error);
    }
  }
}
