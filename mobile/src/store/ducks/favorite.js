import Immutable from 'seamless-immutable';

export const Types = {
  ADD_FAVORITE: 'favorite/ADD',
  REMOVE_FAVORITE: 'favorite/REMOVE',
};

const INITIAL_STATE = Immutable({
  data: [],
});

export default function favorite(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_FAVORITE:
      return { ...state, data: [...state.data, action.payload] };
    case Types.REMOVE_FAVORITE:
      return { ...state, data: state.data.filter(pet => pet._id !== action.payload._id) };

    default:
      return state;
  }
}

export const Creators = {
  addFavorite: payload => ({
    type: Types.ADD_FAVORITE,
    payload,
  }),
  removeFavorite: payload => ({
    type: Types.REMOVE_FAVORITE,
    payload,
  }),
};
