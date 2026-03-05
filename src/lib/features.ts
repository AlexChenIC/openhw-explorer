const envNewsEnabled = process.env.NEXT_PUBLIC_ENABLE_NEWS;

export const features = {
  newsEnabled: envNewsEnabled === "true",
} as const;
