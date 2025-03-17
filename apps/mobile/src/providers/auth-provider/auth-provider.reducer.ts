import { AuthAction, AuthState } from './auth-provider.types';

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN': {
      const { name, accessToken, refreshToken, location } = action.payload;

      return {
        ...state,
        status: 'LOGGED',
        tokens: { accessToken, refreshToken },
        user: { name, location },
      };
    }
    case 'SIGN_UP_COMPLETED': {
      const { location } = action.payload;

      if (!state.user) throw new Error('User not logged in');

      return {
        ...state,
        user: { ...state.user, location },
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
