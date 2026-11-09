// The "dev" API key turns PostHog off. Feature flags then come from
// local-feature-flags.ts (see use-feature-flag.ts).
export const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
export const isPostHogDisabled = POSTHOG_API_KEY === 'dev';
