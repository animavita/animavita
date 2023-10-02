import { createContext, useMemo, useState } from 'react';

import {
  OnBoardingContextType,
  UserInfo,
  UpdateUserInfo,
  UpdateUserLocation,
} from './onboarding-provider.types';
import { useAuth } from '../../hooks/use-auth-provider';

const intialState: UserInfo = {
  name: '',
  password: '',
  email: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const OnBoardingContext = createContext<OnBoardingContextType>({} as OnBoardingContextType);

export const OnBoardingProvider = ({ children }: React.PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(intialState);

  const auth = useAuth();

  const updateUserInfo: UpdateUserInfo = ({ email, password, name }) => {
    setUserInfo((old) => ({
      ...old,
      name,
      email,
      password,
    }));
  };

  const updateUserLocation: UpdateUserLocation = ({ location }) => {
    setUserInfo((old) => ({
      ...old,
      location,
    }));
  };

  const signUp = () => {
    auth.signIn({
      accessToken: '1234',
      refreshToken: '4321',
      name: userInfo.name,
    });
  };

  const value = useMemo(
    () => ({
      userInfo,
      updateUserInfo,
      updateUserLocation,
      signUp,
    }),
    [userInfo]
  );

  return <OnBoardingContext.Provider value={value}>{children}</OnBoardingContext.Provider>;
};
