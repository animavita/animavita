import styled from 'styled-components';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, THEME_COLORS } from '~/utils/constants';

export const ModalContainer = styled(Modal)`
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
  width: 85%;
  height: 60%;
  border-radius: 20;
  background-color: white;
`;

export const Apply = styled.TouchableOpacity`
  flex: 1;
  background-color: ${PRIMARY_COLOR};
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  height: 50;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
`;

export const PetTypeContainer = styled.View`
  margin-top: 10;
  width: 100%;
  padding: 0 25px;
  flex-direction: row;
  justify-content: space-between;
`;
export const GenderContainer = styled.View`
  margin-top: 0;
  align-items: center;
  width: 100%;
`;
export const CheckBoxGroup = styled.View`
  flex-direction: row;
`;

export const AnimalType = styled.View`
  margin-top: 10;
  align-items: center;
  width: 100%;
`;

export const SizeContainer = styled.View`
  margin-top: 0;
  align-items: center;
  width: 100%;
`;

export const Field = styled.Text`
  color: #c5ccd6;
  margin-bottom: 5;
  font-size: 12;
`;

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    justifyContent: 'flex-end',
    height: '91%',
    borderRadius: 520,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop: 10,
    shadowOpacity: 0.5,
  },
  image: { borderRadius: 15 },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: { width: -1, height: 5 },
    textShadowRadius: 10,
  },
  petType: {
    width: 105,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  petTypeImage: { borderRadius: 10 },
  modalTitle: {
    marginBottom: 10,
  },
  selectedButtonStyle: { backgroundColor: THEME_COLORS.SECONDARY },
  selectedTextStyle: { fontSize: 12 },
  textStyle: { color: THEME_COLORS.BLACK, fontSize: 12 },
  containerStyle: { height: 25 },
  checkboxText: { fontSize: 12, color: THEME_COLORS.BLACK, fontWeight: 'normal' },
  checkboxContainer: { backgroundColor: 'white', borderWidth: 0 },
});
