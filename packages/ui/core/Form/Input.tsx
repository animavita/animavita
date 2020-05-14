import React from 'react';
import {TextInputProps} from 'react-native';
import {px2ddp} from '@animavita/theme/index';
import styled from 'styled-components/native';

// styles
export const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: ${px2ddp(2)}px 0px;
`;

// types
type InputProps = TextInputProps;

const Input: React.FC<InputProps> = ({...props}) => {
  return <StyledTextInput {...props} />;
};

export default Input;
