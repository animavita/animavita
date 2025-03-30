import { Coordinates } from '@animavita/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useReducer } from 'react';

import AuthReducer from './auth-provider.reducer';
import { AuthContextActions, UseAuthActions, UserPayload } from './auth-provider.types';

import {
  getUserCredentials,
  removeUserCredentials,
  saveUserCredentials,
} from '@/helpers/secure-store';
import { QUERY_KEYS } from '@/services/query-keys';
import { persistUserToken } from '@/services/sign-in';
import { getCurrentUserInfo } from '@/services/user';

const useAuthActions = (): UseAuthActions => {
  const [state, dispatch] = useReducer(AuthReducer, {
    tokens: null,
    user: null,
    status: 'IDLE',
  });

  const userInfoQuery = useQuery({
    queryKey: [QUERY_KEYS.getUserInfo],
    queryFn: getCurrentUserInfo,
    enabled: false,
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const tokens = await getUserCredentials();

        if (tokens !== null) {
          persistUserToken(tokens.accessToken);
          const { data } = await userInfoQuery.refetch();

          if (!data) {
            await authActions.signOut();
            return;
          }

          const { name, location } = data.data;

          dispatch({
            type: 'SIGN_IN',
            payload: { ...tokens, name, location },
          });
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
        persistUserToken(payload.accessToken);
        dispatch({ type: 'SIGN_IN', payload });
        await saveUserCredentials(payload);
      },
      signOut: async () => {
        await removeUserCredentials();
        dispatch({ type: 'SIGN_OUT' });
      },
      completeSignUp: (location: Coordinates) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { location } });
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
