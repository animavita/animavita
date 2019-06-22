import Immutable from 'seamless-immutable';

export const Types = {
  SET_FILTERS: 'filters/SET',
};

const INITIAL_STATE = Immutable({
  data: {
    quantity: 1,
  },
});

export default function filter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_FILTERS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}

export const Creators = {
  setFilters: filters => ({
    type: Types.SET_FILTERS,
    payload: filters,
  }),
};
