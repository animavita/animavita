import React from 'react';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  PetImage, Informations, Name, SubText, Gender, Card, styles,
} from './styles';

const Pet = ({ animal }) => (
  <Card>
    <PetImage
      imageStyle={styles.image}
      source={{
        uri: animal.firstImage,
      }}
    >
      <Gender>
        <TouchableOpacity>
          <Icon
            name={`${animal.gender}-symbol`}
            type="foundation"
            color={animal.gender === 'male' ? THEME_COLORS.MALE_GENDER : THEME_COLORS.FEMALE_GENDER}
            size={45}
          />
        </TouchableOpacity>
      </Gender>
      <Informations>
        <Name style={styles.shadow}>{animal.name}</Name>
        <SubText style={styles.shadow}>
          {animal.breed}
        </SubText>
        <SubText style={styles.shadow}>
          {animal.size}
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
    distance: PropTypes.number,
  }).isRequired,
};

export default Pet;
