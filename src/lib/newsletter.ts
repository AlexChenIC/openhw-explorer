// Enabling collection requires a reviewed privacy notice and tested consent lifecycle.
export const newsletterRelease = { enabled: false, privacyReviewedAt: null } as const;

export function publishedNewsletterUsername(username?: string): string | undefined {
  return newsletterRelease.enabled && newsletterRelease.privacyReviewedAt
    ? username?.trim() || undefined
    : undefined;
}
