import { AuthAction, AuthState } from './auth-provider.types';

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN': {
      const { name, accessToken, refreshToken } = action.payload;

      return {
        ...state,
        status: 'LOGGED',
        tokens: { accessToken, refreshToken },
        user: { name },
      };
    }
    case 'SIGN_OUT':
      return {
        ...state,
        status: 'NOT_LOGGED',
        tokens: null,
        user: null,
      };
  }
};

export default AuthReducer;
