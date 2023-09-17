import { UserType, CredentialsType } from '@animavita/types';

type UserInfo = Pick<UserType, 'name'>;

export type UserPayload = CredentialsType & UserInfo;

export type AuthState = {
  tokens?: CredentialsType | null;
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
