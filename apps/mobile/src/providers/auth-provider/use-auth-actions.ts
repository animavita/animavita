import { useMemo, useReducer } from 'react';

import AuthReducer from './auth-provider.reducer';
import { AuthContextActions, UseAuthActions, UserPayload } from './auth-provider.types';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    tokens: null,
    user: null,
    status: 'NOT_LOGGED',
  });

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (payload: UserPayload) => {
        dispatch({ type: 'SIGN_IN', payload });
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
