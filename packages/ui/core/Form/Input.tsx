import React from 'react';
import {TextInputProps} from 'react-native';
import {px2ddp, PossibleThemes, useTheme} from '@animavita/theme';
import styled from 'styled-components/native';

// styles
export const StyledTextInput = styled.TextInput<{themeName: PossibleThemes}>`
  flex: 1;
  padding: ${px2ddp(2)}px 0px;
  color: ${({themeName, theme}) => (themeName === 'light' ? theme.black : theme.white)};
`;

// types
type InputProps = TextInputProps;

const Input: React.FC<InputProps> = ({...props}) => {
  const {themeName} = useTheme();
  return <StyledTextInput themeName={themeName} {...props} />;
};

export default Input;
