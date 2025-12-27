import { Coordinates, UserType } from '@animavita/types';
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
import { persistUserToken, logoutRequest } from '@/services/sign-in';
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

  const { refetch: refetchUserInfo } = userInfoQuery;

  useEffect(() => {
    const initState = async () => {
      try {
        const tokens = await getUserCredentials();

        if (tokens !== null) {
          persistUserToken(tokens.accessToken);
          const { data, failureCount } = await refetchUserInfo();

          if (failureCount >= 3) {
            dispatch({ type: 'SIGN_OUT' });
            return;
          }

          if (!data || !data.data) {
            return;
          }

          const { name, location, role, phoneNumber } = data.data;

          dispatch({
            type: 'SIGN_IN',
            payload: { ...tokens, name, location, role, phoneNumber },
          });
        } else {
          dispatch({ type: 'SIGN_OUT' });
        }
      } catch (e) {
        console.error(e);
      }
    };

    initState();
  }, [refetchUserInfo]);

  const authActions: AuthContextActions = useMemo(
    () => ({
      signIn: async (payload: UserPayload) => {
        persistUserToken(payload.accessToken);

        const { data } = await userInfoQuery.refetch();

        if (!data) {
          await removeUserCredentials();
          dispatch({ type: 'SIGN_OUT' });
          return;
        }

        const { name, location, role, phoneNumber } = data.data;

        dispatch({ type: 'SIGN_IN', payload: { ...payload, name, location, role, phoneNumber } });
        await saveUserCredentials(payload);
      },
      signOut: async () => {
        try {
          await logoutRequest();
        } catch (error) {
          console.log('Logout API call failed:', error);
        }
        await removeUserCredentials();
        dispatch({ type: 'SIGN_OUT' });
      },
      completeSignUp: (location: Coordinates) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { location } });
      },
      choseRole: (role: UserType['role']) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { role } });
      },
      updatePhoneNumber: (phoneNumber: UserType['phoneNumber']) => {
        dispatch({ type: 'SIGN_UP_COMPLETED', payload: { phoneNumber } });
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
