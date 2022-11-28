import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Title = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${moderateScale(28)}px;
`;

export const Form = styled.View`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: ${moderateScale(24)}px;
`;

export const Types = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: ${moderateScale(8)}px 0;
`;
