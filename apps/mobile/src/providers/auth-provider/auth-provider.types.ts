export type UserToken = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  userToken?: UserToken | null;
  status: 'IDLE' | 'NOT_LOGGED' | 'LOGGED';
};

export type AuthAction = { type: 'SIGN_IN'; token: UserToken } | { type: 'SIGN_OUT' };

export type AuthContextActions = {
  signIn: (token: UserToken) => void;
  signOut: () => void;
};

export type AuthContextType = AuthState & AuthContextActions;

export type UseAuthActions = {
  state: AuthState;
  authActions: AuthContextActions;
};
