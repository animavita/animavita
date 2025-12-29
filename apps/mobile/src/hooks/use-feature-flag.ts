import { useFeatureFlag as usePostHogFeatureFlag } from 'posthog-react-native';

import { LOCAL_FEATURE_FLAGS } from '@/config/local-feature-flags';

export const useFeatureFlag = (flagName: string): boolean => {
  const isDev = process.env.NODE_ENV === 'development';
  const postHogFlag = usePostHogFeatureFlag(flagName);

  if (isDev) {
    const localOverride = LOCAL_FEATURE_FLAGS[flagName];
    if (localOverride !== undefined) {
      return localOverride;
    }
  }

  return postHogFlag === true;
};
