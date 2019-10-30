export const Types = {
  SET_AUTH: 'auth/SET_USER_AUTHENTICATED',
  CLEAR_AUTH: 'auth/CLEAR_USER_AUTHENTICATED',
};

const INITIAL_STATE = {
  _id: null,
  name: '',
  lastname: '',
  avatar: '',
  email: '',
  distance: 10,
  notifications: false,
  hero: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_AUTH:
      return { ...state, ...action.payload };
    case Types.CLEAR_AUTH:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const Creators = {
  setAuth: user => ({
    type: Types.SET_AUTH,
    payload: user,
  }),
  clearAuth: () => ({
    type: Types.CLEAR_AUTH,
  }),
};
