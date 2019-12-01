import styled from 'styled-components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

export const Name = styled.Text`
  font-weight: bold;
  font-size: ${hp('4%')};
  font-family: 'Roboto';
  color: #ffffff;
`;

export const PetImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
`;

export const SubText = styled.Text`
  font-weight: bold;
  font-size: ${hp('2%')};
  font-family: 'Roboto';
  color: #ffffff;
`;

export const Informations = styled.View`
  margin-left: 15px;
  margin-bottom: 15px;
`;

export const Heart = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  padding: 20px 20px;
`;

export const Card = styled.View`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  height: ${hp('59%')};
  margin-top: 10;
  border-radius: 520;
`;

export const styles = StyleSheet.create({
  image: { borderRadius: 15 },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: { width: -1, height: 5 },
    textShadowRadius: 10,
  },
});
