import { useContext } from 'react';

import { AuthContext, AuthContextType } from '../../providers/auth-provider/auth-provider';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }

  return context;
};
