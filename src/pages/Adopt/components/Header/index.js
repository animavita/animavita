import React from 'react';

import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { PRIMARY_COLOR } from '~/utils/constants';

import { Container, PetType, Center } from './styles';

const Header = ({ openModal, createAdopt }) => (
  <Container>
    <TouchableOpacity onPress={openModal}>
      <Icon name="settings" type="octicon" color={PRIMARY_COLOR} size={28} />
    </TouchableOpacity>
    <Center>
      <PetType size={9}>RESULTADOS PARA</PetType>
      <PetType>CÃES</PetType>
    </Center>
    <TouchableOpacity onPress={createAdopt}>
      <Icon name="library-add" type="material-icons" color={PRIMARY_COLOR} size={28} />
    </TouchableOpacity>
  </Container>
);

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
  createAdopt: PropTypes.func.isRequired,
};

export default Header;
