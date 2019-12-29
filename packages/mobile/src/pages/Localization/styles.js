import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
  padding: 30px 32px;
  padding-top: 25px;
`;

export const Content = styled.View`
  align-items: center;
  margin-top: -10px;
  margin-bottom: 15px;
`;

export const Header = styled.View`
  align-items: flex-start;
`;

export const Footer = styled.View`
  align-items: center;
  width: 100%;
`;

export const Research = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const styles = StyleSheet.create({
  image: { width: wp('90%'), height: hp('55%') },
});
