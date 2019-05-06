import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  PetImage, Informations, Name, SubText, Heart, styles,
} from './styles';

const Pet = ({ animal }) => (
  <View style={styles.card}>
    <PetImage
      imageStyle={styles.image}
      source={{
        uri: animal.image,
      }}
    >
      <Heart>
        <TouchableOpacity onPress={() => alert('s')}>
          <Icon name="heart-o" type="font-awesome" color="black" size={30} />
        </TouchableOpacity>
      </Heart>
      <Informations>
        <Name style={styles.shadow}>{animal.name}</Name>
        <SubText style={styles.shadow}>{animal.breed}</SubText>
        <SubText style={styles.shadow}>{animal.distance} kilômetros de distância</SubText>
      </Informations>
    </PetImage>
  </View>
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
