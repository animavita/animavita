import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  PetImage, Informations, Name, SubText, Heart, Card, styles,
} from './styles';

import { THEME_COLORS } from '~/utils/constants';

const Pet = ({ animal }) => (
  <Card>
    <PetImage
      imageStyle={styles.image}
      source={{
        uri: animal.image,
      }}
    >
      <Heart>
        <TouchableOpacity onPress={() => alert('s')}>
          <Icon name="heart-o" type="font-awesome" color={THEME_COLORS.BLACK} size={28} />
        </TouchableOpacity>
      </Heart>
      <Informations>
        <Name style={styles.shadow}>{animal.name}</Name>
        <SubText style={styles.shadow}>{animal.breed}</SubText>
        <SubText style={styles.shadow}>{animal.distance} kilômetros de distância</SubText>
      </Informations>
    </PetImage>
  </Card>
);

Pet.propTypes = {
  animal: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
  }).isRequired,
};

export default Pet;
