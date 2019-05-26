import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, CheckBox, Icon } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Title, H1 } from '~/components';
import { PRIMARY_COLOR, THEME_COLORS } from '~/utils/constants';
import Button from '~/components/Button';
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
  Field,
  styles,
} from './styles';

const PetType = ({ type, handlePetType }) => (
  <PetTypeContainer>
    <Button title="CÃES" onPress={() => alert('oi')} />
    <Button title="GATOS" onPress={() => alert('oi')} />
  </PetTypeContainer>
);

const Size = ({ updateSize, index }) => (
  <SizeContainer>
    <Field size={12}>Qual o porte do animal?</Field>
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
    <Field size={12}>Qual o gênero do animal?</Field>
    <CheckBoxGroup>
      <CheckBox
        center
        title="Macho"
        iconType="feather"
        uncheckedIcon="square"
        checkedIcon="x-square"
        checkedColor={THEME_COLORS.SECONDARY}
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
        checkedColor={THEME_COLORS.SECONDARY}
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
                  <H1 size={20}>FILTROS</H1>
                </View>
                <Field>Que tipo de animal você está procurando?</Field>
                <PetType />
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
