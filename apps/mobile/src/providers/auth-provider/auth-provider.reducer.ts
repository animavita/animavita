import { AuthAction, AuthState } from './auth-provider.types';

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN': {
      const { name, accessToken, refreshToken, location, role, phoneNumber, sessionId } =
        action.payload;

      return {
        ...state,
        status: 'LOGGED',
        tokens: { accessToken, refreshToken, sessionId },
        user: { name, location, role, phoneNumber },
      };
    }
    case 'SIGN_UP_COMPLETED': {
      const { location, role, phoneNumber } = action.payload;

      if (!state.user) throw new Error('User not logged in');

      const user = { ...state.user };

      if (location) user.location = location;
      if (role) user.role = role;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      return {
        ...state,
        user,
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
