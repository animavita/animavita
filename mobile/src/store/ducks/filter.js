import Immutable from 'seamless-immutable';

export const Types = {
  SET_FILTERS: 'filters/SET',
  CLEAR_FILTERS: 'filters/CLEAR',
};

const INITIAL_STATE = Immutable({
  gender: '',
  type: '',
  size: '',
  age_lte: 1,
});

export default function filter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_FILTERS:
      return { ...state, ...action.payload };
    case Types.CLEAR_FILTERS:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const Creators = {
  setFilters: filters => ({
    type: Types.SET_FILTERS,
    payload: filters,
  }),
  clearFilters: () => ({
    type: Types.CLEAR_FILTERS,
  }),
};
