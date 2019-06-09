import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15;
  left: 20;
`;

export const Container = styled.View`
  flex: 1;
`;

export const PetImage = styled.ImageBackground`
  flex: 1;
`;

export const Slide = styled.View`
  height: 50%;
`;

export const PetDetail = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
`;

export const PetData = styled.View`
  width: 60%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
`;

export const FooterContent = styled.View`
  align-items: center;
`;
export const Observations = styled.View`
  padding: 0 10px;
`;

export const Action = styled.TouchableOpacity`
  justify-content: center;
`;

export const ActionButtons = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

export const ScrollScreen = styled.ScrollView`
  margin-bottom: 10;
`;

export const styles = StyleSheet.create({
  wrapper: {
    height: '50%',
  },
});
