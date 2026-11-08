import { useFeatureFlag as usePostHogFeatureFlag } from 'posthog-react-native';

import { useFeatureFlag } from './use-feature-flag';

jest.mock('posthog-react-native', () => ({ useFeatureFlag: jest.fn() }));
jest.mock('@/config/local-feature-flags', () => ({
  LOCAL_FEATURE_FLAGS: { local_on: true },
}));
jest.mock('@/config/posthog', () => ({ isPostHogDisabled: false }));

const postHogFlag = jest.mocked(usePostHogFeatureFlag);
const posthogConfig = jest.requireMock<{ isPostHogDisabled: boolean }>('@/config/posthog');
const env = { ...process.env };

describe('useFeatureFlag', () => {
  beforeEach(() => {
    process.env = { ...env, NODE_ENV: 'production' };
    postHogFlag.mockReturnValue(undefined);
  });

  afterAll(() => {
    process.env = env;
  });

  describe('when PostHog is disabled with the "dev" key', () => {
    beforeEach(() => {
      posthogConfig.isPostHogDisabled = true;
    });

    it('uses the local flag, even in a release build', () => {
      expect(useFeatureFlag('local_on')).toBe(true);
    });

    it('returns false for a flag with no local value instead of loading forever', () => {
      expect(useFeatureFlag('unknown')).toBe(false);
    });
  });

  describe('when PostHog is enabled', () => {
    beforeEach(() => {
      posthogConfig.isPostHogDisabled = false;
    });

    it('returns undefined while PostHog loads', () => {
      expect(useFeatureFlag('local_on')).toBeUndefined();
    });

    it('returns the PostHog value', () => {
      postHogFlag.mockReturnValue(true);
      expect(useFeatureFlag('unknown')).toBe(true);
    });
  });
});
