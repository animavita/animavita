import { useContext } from 'react';

import { OnBoardingContext, OnBoardingContextType } from '../providers/onboarding-provider';

export const useSignUp = (): OnBoardingContextType => {
  const context = useContext(OnBoardingContext);

  if (!context) {
    throw new Error('useSignUp must be inside an OnBoardingContext with a value');
  }

  return context;
};
