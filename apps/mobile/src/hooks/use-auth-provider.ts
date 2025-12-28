import { useContext } from 'react';

import { AuthContext } from '@/state/auth-provider/auth-provider';
import { AuthContextType } from '@/state/auth-provider/auth-provider.types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }

  return context;
};
