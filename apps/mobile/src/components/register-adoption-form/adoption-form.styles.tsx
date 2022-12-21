import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Types = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: ${moderateScale(8)}px 0;
`;
