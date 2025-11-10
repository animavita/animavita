import { Coordinates, UserType } from '@animavita/types';
import { useMemo, useReducer } from 'react';

import AuthReducer from './auth-provider.reducer';
import { AuthContextActions, UseAuthActions, UserPayload } from './auth-provider.types';

import { persistUserToken } from '@/services/sign-in';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    tokens: null,
    user: null,
    status: 'NOT_LOGGED',
  });

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (payload: UserPayload) => {
        persistUserToken(payload.accessToken);
        dispatch({ type: 'SIGN_IN', payload });
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
      },
      completeSignUp: (location: Coordinates) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { location } });
      },
      choseRole: (role: UserType['role']) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { role } });
      },
    }),
    []
  );

  return {
    state,
    authActions,
  };
};

export default useAuthActions;
