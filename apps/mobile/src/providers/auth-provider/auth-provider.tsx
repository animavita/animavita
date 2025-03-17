import { createContext } from 'react';

import { AuthContextType } from './auth-provider.types';
// if on mobile, use-auth-actions.native.ts will be picked
import useAuthActions from './use-auth-actions';

export const AuthContext = createContext<AuthContextType>({
  status: 'IDLE',
  tokens: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
  completeSignUp: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, authActions } = useAuthActions();

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>{children}</AuthContext.Provider>
  );
};
