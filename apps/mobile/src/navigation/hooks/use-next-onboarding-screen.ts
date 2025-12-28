import { useFeatureFlag } from 'posthog-react-native';

import { StackParamsList } from '../main-navigator';

import { UserInfo } from '@/state/auth-provider/auth-provider.types';

const useNextOnboardingScreen = (): ((
  user: UserInfo | undefined | null
) => keyof Pick<StackParamsList, 'RoleSelection' | 'PhoneNumber' | 'GeoLocation' | 'Home'>) => {
  const requirePhoneNumber = useFeatureFlag('require_phone_number');

  return (user: UserInfo | undefined | null) => {
    if (!user?.role) {
      return 'RoleSelection';
    }

    if (requirePhoneNumber && !user?.phoneNumber) {
      return 'PhoneNumber';
    }

    if (!user?.location) {
      return 'GeoLocation';
    }

    return 'Home';
  };
};

export default useNextOnboardingScreen;
