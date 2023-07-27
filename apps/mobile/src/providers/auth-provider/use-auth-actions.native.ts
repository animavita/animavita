import { useEffect, useMemo, useReducer } from 'react';

import AuthReducer from './auth-provider.reducer';
import { AuthContextActions, UseAuthActions, UserPayload } from './auth-provider.types';
import { getUser, removeUser, saveUser } from '../../helpers/secure-store';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    tokens: null,
    user: null,
    status: 'IDLE',
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const user = await getUser();

        if (user !== null) {
          dispatch({ type: 'SIGN_IN', payload: user });
        } else {
          dispatch({ type: 'SIGN_OUT' });
        }
      } catch (e) {
        // catch error here
        // Maybe sign_out user!
        console.error(e);
      }
    };

    initState();
  }, []);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (payload: UserPayload) => {
        dispatch({ type: 'SIGN_IN', payload });
        await saveUser(payload);
      },
      signOut: async () => {
        await removeUser();
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
