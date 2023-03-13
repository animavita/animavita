import { AuthAction, AuthState } from './auth-provider.types';

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

export default AuthReducer;
