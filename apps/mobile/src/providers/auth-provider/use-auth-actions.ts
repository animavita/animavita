import { useMemo, useReducer } from 'react';

import { AuthReducer } from './auth-provider';
import { AuthContextActions, UseAuthActions, UserToken } from './auth-provider.types';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    userToken: null,
    status: 'NOT_LOGGED',
  });

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (token: UserToken) => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
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
