import { createContext } from 'react';

import { AuthAction, AuthContextType, AuthState } from './auth-provider.types';
// if on mobile, use-auth-actions.native.ts will be picked
import useAuthActions from './use-auth-actions';

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        status: 'LOGGED',
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        status: 'NOT_LOGGED',
        userToken: null,
      };
  }
};

export const AuthContext = createContext<AuthContextType>({
  status: 'IDLE',
  userToken: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, authActions } = useAuthActions();

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>{children}</AuthContext.Provider>
  );
};
