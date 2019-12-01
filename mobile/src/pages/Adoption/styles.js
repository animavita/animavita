import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
  padding: 0px ${`${Math.floor(hp('4%'))}px`}
`;
