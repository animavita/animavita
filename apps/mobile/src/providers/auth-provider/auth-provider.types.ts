import { UserType, CredentialsType, Coordinates } from '@animavita/types';

type UserInfo = Pick<UserType, 'name' | 'location'>;

export type UserPayload = CredentialsType & UserInfo;

export type AuthState = {
  tokens?: CredentialsType | null;
  user?: UserInfo | null;
  status: 'IDLE' | 'NOT_LOGGED' | 'LOGGED';
};

export type AuthAction =
  | { type: 'SIGN_IN'; payload: UserPayload }
  | { type: 'SIGN_UP_COMPLETED'; payload: Pick<UserPayload, 'location'> }
  | { type: 'SIGN_OUT' };

export type AuthContextActions = {
  signIn: (payload: UserPayload) => void;
  signOut: () => void;
  completeSignUp: (coordinates: Coordinates) => void;
};

export type AuthContextType = AuthState & AuthContextActions;

export type UseAuthActions = {
  state: AuthState;
  authActions: AuthContextActions;
};
