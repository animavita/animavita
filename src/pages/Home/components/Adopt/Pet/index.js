import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  PetImage, Informations, Name, SubText, Heart, Card, styles,
} from './styles';

import { THEME_COLORS } from '~/utils/constants';

const handleFavoritePet = () => {
  console.log('favorited');
};

const Pet = ({ animal }) => (
  <Card>
    <PetImage
      imageStyle={styles.image}
      source={{
        uri: animal.images[0].url,
      }}
    >
      <Heart>
        <TouchableOpacity onPress={() => handleFavoritePet()}>
          <Icon name="heart-o" type="font-awesome" color={THEME_COLORS.BLACK} size={28} />
        </TouchableOpacity>
      </Heart>
      <Informations>
        <Name style={styles.shadow}>{animal.name}</Name>
        <SubText style={styles.shadow}>{animal.breed}</SubText>
        <SubText style={styles.shadow}>Macho / Médio</SubText>
      </Informations>
    </PetImage>
  </Card>
);

Pet.propTypes = {
  animal: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    distance: PropTypes.number,
  }).isRequired,
};

export default Pet;
