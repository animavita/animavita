import { UserType } from '@animavita/models';

type UserToken = {
  accessToken: string;
  refreshToken: string;
};

type UserInfo = Pick<UserType, 'name'>;

export type UserPayload = UserToken & UserInfo;

export type AuthState = {
  tokens?: UserToken | null;
  user?: UserInfo | null;
  status: 'IDLE' | 'NOT_LOGGED' | 'LOGGED';
};

export type AuthAction = { type: 'SIGN_IN'; payload: UserPayload } | { type: 'SIGN_OUT' };

export type AuthContextActions = {
  signIn: (payload: UserPayload) => void;
  signOut: () => void;
};

export type AuthContextType = AuthState & AuthContextActions;

export type UseAuthActions = {
  state: AuthState;
  authActions: AuthContextActions;
};
