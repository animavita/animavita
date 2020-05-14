import React from 'react';
import {SwitchProps} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '@animavita/theme';

const StyledSwitch = styled.Switch``;

const Switch: React.FC<SwitchProps> = ({...props}) => {
  const theme = useTheme();

  const trackColor = {false: theme.styledTheme.grey, true: theme.styledTheme.greenLight};
  const thumbColor = theme.styledTheme.greenLight;

  return <StyledSwitch trackColor={trackColor} thumbColor={thumbColor} {...props} />;
};

export default Switch;
