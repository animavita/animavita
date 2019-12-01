import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height } = Dimensions.get('window');


export const FormContainer = styled.ScrollView`
  margin-top: ${hp('2%')};
  max-height: ${height > 1000 ? hp('70%') : hp('68%')};
  margin-bottom: 15px;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const styles = StyleSheet.create({
  input: {
    fontSize: hp('2%'),
    padding: 0,
    color: THEME_COLORS.BLACK,
  },
  picker: {
    height: hp('4%'),
    width: '100%',
    color: THEME_COLORS.BLACK,
  },
});
