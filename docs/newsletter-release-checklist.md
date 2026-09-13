# Email Subscription Release Gate

The subscription form remains disabled by src/lib/newsletter.ts, even if a Buttondown username is configured. Enabling it requires a reviewed code change in the same PR as the bilingual privacy notice.

- Identify the controller and contact channel; describe course/event updates and the email processor.
- Explain consent, retention, data transfers where applicable, unsubscribe and deletion requests.
- Correct About's statement that this site does not request personal information.
- Verify confirmation, unsubscribe and deletion with an owner's controlled test address.
- Record review date in newsletterRelease. Never commit subscriber addresses, API keys or exports.
- Keep GitHub feedback explicitly public and LinkedIn feedback an external private-message option.

This gate prevents accidental activation; it is not a legal compliance certification.
