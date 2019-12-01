import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
  padding: 0px ${`${Math.floor(hp('2%'))}px`};
`;

export const styles = StyleSheet.create({
  heart: hp('2.5%'),
  chevron: hp('5%'),
  size: hp('8.5%'),
  subtitle: { fontSize: hp('2.5%') },
  title: { color: THEME_COLORS.SECONDARY, fontWeight: 'bold', fontSize: hp('3.5%') },
});
