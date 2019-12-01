import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
`;

export const TopButtons = styled.View`
  flex-direction: row;
  height: ${hp('5%')};
  justify-content: space-between;
  padding: 0px ${`${Math.floor(hp('2%'))}px`};
  margin-bottom: 10px;
`;
