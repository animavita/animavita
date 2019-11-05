import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as FavoriteCreators } from '~/store/ducks/favorite';

const useFavorite = (animal) => {
  const favorites = useSelector(state => state.favorite.data);
  const [favorited, setFavorited] = useState(!!favorites.find(pet => pet._id === animal._id));
  const dispatch = useDispatch();

  function handleFavorite() {
    if (favorited) {
      dispatch(FavoriteCreators.removeFavorite(animal));
      setFavorited(false);
    } else {
      dispatch(FavoriteCreators.addFavorite(animal));
      setFavorited(true);
    }
  }

  return [favorited, handleFavorite];
};

export default useFavorite;
