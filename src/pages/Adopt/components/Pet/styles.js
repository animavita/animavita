import styled from 'styled-components';
import { StyleSheet } from 'react-native';

export const Name = styled.Text`
  font-weight: bold;
  font-size: 55;
  font-family: 'Roboto';
  color: #ffffff;
`;

export const PetImage = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
`;

export const SubText = styled.Text`
  font-weight: bold;
  font-size: 14;
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
  width: 100%;
  padding: 20px 20px;
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
});
