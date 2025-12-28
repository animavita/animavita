import { createContext } from 'react';

import { AuthContextType } from './auth-provider.types';
import useAuthActions from './use-auth-actions';

export const AuthContext = createContext<AuthContextType>({
  status: 'IDLE',
  tokens: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
  completeSignUp: () => {},
  choseRole: () => {},
  updatePhoneNumber: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, authActions } = useAuthActions();

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>{children}</AuthContext.Provider>
  );
};
