import React from 'react';
import PropTypes from 'prop-types';
import {
  PetImage, Informations, Name, SubText, Card, styles
} from './styles';

const Pet = ({ animal }) => (
  <Card>
    <PetImage
      imageStyle={styles.image}
      source={{
        uri: animal.firstImage
      }}
    >
      <Informations>
        <Name style={styles.shadow}>{animal.name}</Name>
        <SubText style={styles.shadow}>{animal.breed}</SubText>
        <SubText style={styles.shadow}>
          {animal.gender} / {animal.size}
        </SubText>
      </Informations>
    </PetImage>
  </Card>
);

Pet.propTypes = {
  animal: PropTypes.shape({
    image: PropTypes.string,
    firstImage: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    distance: PropTypes.number
  }).isRequired
};

export default Pet;
