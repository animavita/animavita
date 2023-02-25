import { useEffect, useReducer, useMemo, createContext } from 'react';

import { getUserToken, removeUserToken, saveUserToken } from '../../helpers/secure-store';

export type UserToken = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  userToken?: UserToken | null;
  status: 'IDLE' | 'NOT_LOGGED' | 'LOGGED';
};

type AuthAction = { type: 'SIGN_IN'; token: UserToken } | { type: 'SIGN_OUT' };

type AuthContextActions = {
  signIn: (token: UserToken) => void;
  signOut: () => void;
};

export type AuthContextType = AuthState & AuthContextActions;

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
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

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>{children}</AuthContext.Provider>
  );
};
