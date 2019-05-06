import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, CheckBox, Icon } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Title } from '~/components';
import { PRIMARY_COLOR } from '~/utils/constants';

import {
  ModalContainer,
  PetTypeContainer,
  Container,
  Apply,
  GenderContainer,
  ButtonContainer,
  CheckBoxGroup,
  AnimalType,
  SizeContainer,
  styles,
} from './styles';

const PetType = ({ type, handlePetType }) => (
  <PetTypeContainer>
    <TouchableOpacity activeOpacity={0.8} onPress={() => handlePetType('dogs')}>
      <ImageBackground
        source={{
          uri: 'https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg',
        }}
        style={styles.petType}
        imageStyle={styles.petTypeImage}
      >
        <Title size={16} color="white" style={styles.shadow}>
          CÃES
        </Title>
        <Icon
          name="check"
          type="entypo"
          size={30}
          color={type === 'dogs' ? PRIMARY_COLOR : 'transparent'}
        />
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} onPress={() => handlePetType('cats')}>
      <ImageBackground
        source={{
          uri:
            'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg',
        }}
        style={styles.petType}
        imageStyle={styles.petTypeImage}
      >
        <Title size={16} color="white" style={styles.shadow}>
          GATOS
        </Title>
        <Icon
          name="check"
          type="entypo"
          size={30}
          color={type === 'cats' ? PRIMARY_COLOR : 'transparent'}
        />
      </ImageBackground>
    </TouchableOpacity>
  </PetTypeContainer>
);

const Size = ({ updateSize, index }) => (
  <SizeContainer>
    <Title size={12}>Qual o porte do animal?</Title>
    <ButtonGroup
      onPress={updateSize}
      selectedIndex={index}
      buttons={['Pequeno', 'Médio', 'Grande', 'Todos']}
      selectedButtonStyle={styles.selectedButtonStyle}
      selectedTextStyle={styles.selectedTextStyle}
      textStyle={styles.textStyle}
      containerStyle={styles.containerStyle}
    />
  </SizeContainer>
);

const Gender = ({ gender, setGender }) => (
  <GenderContainer>
    <Title size={12}>Qual o gênero do animal?</Title>
    <CheckBoxGroup>
      <CheckBox
        center
        title="Macho"
        iconType="feather"
        uncheckedIcon="square"
        checkedIcon="x-square"
        checkedColor={PRIMARY_COLOR}
        textStyle={styles.checkboxText}
        onPress={() => setGender('M')}
        containerStyle={styles.checkboxContainer}
        checked={gender === 'M'}
      />
      <CheckBox
        center
        title="Fêmea"
        iconType="feather"
        checkedIcon="x-square"
        uncheckedIcon="square"
        checkedColor={PRIMARY_COLOR}
        textStyle={styles.checkboxText}
        containerStyle={styles.checkboxContainer}
        onPress={() => setGender('F')}
        checked={gender === 'F'}
      />
    </CheckBoxGroup>
  </GenderContainer>
);

class Filter extends Component {
  state = {
    loading: true,
    size: 3,
    type: null,
    gender: null,
  };

  setGender(newGender) {
    const { gender } = this.state;
    if (newGender === gender) {
      this.setState({ gender: null });
    } else {
      this.setState({ gender: newGender });
    }
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  handlePetType(newType) {
    const { type } = this.state;
    if (newType === type) {
      this.setState({ type: null });
    } else {
      this.setState({ type: newType });
    }
  }

  updateSize(index) {
    this.setState({ size: index });
  }

  render() {
    const { visible, closeModal } = this.props;
    const {
      loading, gender, size, type,
    } = this.state;
    return (
      <ModalContainer
        isVisible={visible}
        hideModalContentWhileAnimating
        onBackdropPress={closeModal}
        onModalShow={() => this.setLoading(false)}
        onModalHide={() => this.setLoading(true)}
        onBackButtonPress={closeModal}
      >
        <Container>
          {loading ? (
            <BallIndicator color={PRIMARY_COLOR} />
          ) : (
            <Fragment>
              <AnimalType>
                <View style={styles.modalTitle}>
                  <Title size={20}>FILTROS</Title>
                </View>
                <Title size={12}>Que tipo de animal você está procurando?</Title>
                <PetType type={type} handlePetType={newType => this.handlePetType(newType)} />
              </AnimalType>
              <Size index={size} updateSize={index => this.updateSize(index)} />
              <Gender gender={gender} setGender={newGender => this.setGender(newGender)} />

              <ButtonContainer>
                <Apply>
                  <Title size={14} color="white">
                    APLICAR FILTROS
                  </Title>
                </Apply>
              </ButtonContainer>
            </Fragment>
          )}
        </Container>
      </ModalContainer>
    );
  }
}

Filter.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Filter;
