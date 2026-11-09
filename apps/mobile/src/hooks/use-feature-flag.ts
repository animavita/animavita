import { useFeatureFlag as usePostHogFeatureFlag } from 'posthog-react-native';

import { LOCAL_FEATURE_FLAGS } from '@/config/local-feature-flags';
import { isPostHogDisabled } from '@/config/posthog';

export const useFeatureFlag = (flagName: string): boolean | undefined => {
  const isDev = process.env.NODE_ENV === 'development';
  const postHogFlag = usePostHogFeatureFlag(flagName);

  // A disabled PostHog never loads flags, so waiting for it would hang forever
  // (e.g. the e2e build, a release build with no dev fallback below).
  if (isPostHogDisabled) {
    return LOCAL_FEATURE_FLAGS[flagName] ?? false;
  }

  if (isDev) {
    const localOverride = LOCAL_FEATURE_FLAGS[flagName];
    if (localOverride !== undefined) {
      return localOverride;
    }
  }

  // Preserve undefined state while PostHog is loading the flag
  if (postHogFlag === undefined) {
    return undefined;
  }

  return postHogFlag === true;
};
