import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
  padding: ${`${Math.floor(hp('2%'))}px`};
`;

export const Header = styled.View`
  align-items: flex-start;
`;

export const Footer = styled.View`
  align-items: center;
  width: 100%;
`;

export const Terms = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const styles = StyleSheet.create({
  image: { width: '100%', height: hp('60%') },
});
