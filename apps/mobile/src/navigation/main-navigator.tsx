import React from 'react';

import LoggedInNavigator, {
  StackParamsList as LoggedInStackParamsList,
} from './logged-in-navigator';
import LoggedOutNavigator, {
  StackParamsList as LoggedOutStackParamsList,
} from './logged-out-navigator';

import { useAuth } from '@/hooks/use-auth-provider';
import { useFeatureFlag } from '@/hooks/use-feature-flag';
import SplashScreen from '@/screens/splash/splash.screen';

export type StackParamsList = LoggedInStackParamsList & LoggedOutStackParamsList;

const MainNavigator = () => {
  const auth = useAuth();
  const requirePhoneNumber = useFeatureFlag('require_phone_number');

  if (auth.status === 'IDLE' || requirePhoneNumber === undefined) return <SplashScreen />;

  if (auth.status === 'NOT_LOGGED') return <LoggedOutNavigator />;

  return <LoggedInNavigator />;
};

export default MainNavigator;
