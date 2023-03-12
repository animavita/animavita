import { useEffect, useMemo, useReducer } from 'react';

import AuthReducer from './auth-provider.reducer';
import { AuthContextActions, UseAuthActions, UserToken } from './auth-provider.types';
import { getUserToken, removeUserToken, saveUserToken } from '../../helpers/secure-store';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    userToken: null,
    status: 'IDLE',
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const userToken = await getUserToken();

        if (userToken !== null) {
          dispatch({ type: 'SIGN_IN', token: userToken });
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
      signIn: async (token: UserToken) => {
        dispatch({ type: 'SIGN_IN', token });
        await saveUserToken(token);
      },
      signOut: async () => {
        await removeUserToken();
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
