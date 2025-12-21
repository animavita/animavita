import { renderHook } from '@testing-library/react-native';
import { useFeatureFlag } from 'posthog-react-native';

import useNextOnboardingScreen from './use-next-onboarding-screen';

import { UserInfo } from '@/providers/auth-provider/auth-provider.types';

describe('useNextOnboardingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when user has no role', () => {
    it('returns RoleSelection screen', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = { role: undefined } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('RoleSelection');
    });

    it('returns RoleSelection screen for null user', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const nextScreen = getNextScreen(null);

      expect(nextScreen).toBe('RoleSelection');
    });

    it('returns RoleSelection screen for undefined user', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const nextScreen = getNextScreen(undefined);

      expect(nextScreen).toBe('RoleSelection');
    });
  });

  describe('when requirePhoneNumber feature flag is enabled', () => {
    it('returns PhoneNumber screen if user has no phone number', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(true);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = { role: 'ADOPTER', phoneNumber: undefined } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('PhoneNumber');
    });

    it('proceeds to next validation if user has phone number', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(true);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = {
        role: 'ADOPTER',
        phoneNumber: '+1234567890',
        location: undefined,
      } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('GeoLocation');
    });
  });

  describe('when requirePhoneNumber feature flag is disabled', () => {
    it('skips PhoneNumber screen even if user has no phone number', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = {
        role: 'ADOPTER',
        phoneNumber: undefined,
        location: undefined,
      } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('GeoLocation');
    });
  });

  describe('when user has no location', () => {
    it('returns GeoLocation screen', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = {
        role: 'ADOPTER',
        location: undefined,
      } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('GeoLocation');
    });
  });

  describe('when user has completed all onboarding steps', () => {
    it('returns Home screen when phone number is not required', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(false);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = {
        name: 'John Doe',
        role: 'ADOPTER',
        location: { latitude: 40.7128, longitude: -74.006 },
      } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('Home');
    });

    it('returns Home screen when phone number is required and provided', () => {
      jest.mocked(useFeatureFlag).mockReturnValue(true);

      const { result } = renderHook(useNextOnboardingScreen);
      const getNextScreen = result.current;

      const user = {
        name: 'John Doe',
        role: 'ADOPTER',
        phoneNumber: '+1234567890',
        location: { latitude: 40.7128, longitude: -74.006 },
      } as UserInfo;
      const nextScreen = getNextScreen(user);

      expect(nextScreen).toBe('Home');
    });
  });
});
