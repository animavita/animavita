export const LOCAL_FEATURE_FLAGS: Record<string, boolean | undefined> = {
  // On in the e2e build so the flows cover phone verification.
  require_phone_number: process.env.EXPO_PUBLIC_E2E === 'true',
};
