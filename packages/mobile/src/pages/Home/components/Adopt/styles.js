import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
`;

export const TopButtons = styled.View`
  flex-direction: row;
  height: ${hp('5%')};
  justify-content: space-between;
  padding: 0 35px;
  margin-bottom: 10px;
`;
