import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

import theme from '../../../theme';

export const Wrapper = styled.View`
  padding-left: ${moderateScale(16)}px;
  padding-right: ${moderateScale(16)}px;
  padding-bottom: ${moderateScale(16)}px;
  background-color: ${theme.colors.background};
`;
