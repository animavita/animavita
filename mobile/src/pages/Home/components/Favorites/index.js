import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList } from 'react-native';
import ErrorContainer from '~/components/ErrorContainer';
import { isEmpty } from '~/utils/helpers';
import { Creators as FavoriteCreators } from '~/store/ducks/favorite';

import { Container, styles } from './styles';

const Favorites = ({ navigation }) => {
  const favorites = useSelector(state => state.favorite.data);
  const dispatch = useDispatch();

  function renderContent() {
    if (isEmpty(favorites)) {
      return (
        <ErrorContainer
          image={require('~/images/emptyNotifications.jpg')}
          title={'\nSua caixa de notificações está vazia!'}
          description={
            '\n Hmmm, acho que não temos nada para te contar... Na verdade temos sim, você sabia que ter um pet reduz a chance de depressão e o stress? \nEles são incríveis e fofos.'
          }
        />
      );
    }

    return (
      <FlatList
        data={favorites}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: favorite }) => (
          <ListItem
            key={favorite._id}
            title={favorite.name}
            titleStyle={styles.title}
            font
            subtitle={favorite.breed}
            leftAvatar={{
              source: favorite.firstImage && { uri: favorite.firstImage },
            }}
            onPress={() => navigation.navigate('Details', { animal: favorite })}
            bottomDivider
            rightIcon={(
              <TouchableOpacity onPress={() => dispatch(FavoriteCreators.removeFavorite(favorite))}>
                <Icon name="heart" type="font-awesome" color="#FF6767" />
              </TouchableOpacity>
)}
            chevron
          />
        )}
        keyExtractor={conversation => conversation._id}
      />
    );
  }

  return <Container>{renderContent()}</Container>;
};

Favorites.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Favorites;
