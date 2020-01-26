import React from 'react';
import {Platform, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import {px2ddp, useTheme, PossibleThemes} from '@animavita/theme';

import Typography from '../core/Typography';
import Row from '../layout/Row';
import AppleLogo from '../assets/icons/AppleLogo';
import Space from '../layout/Space';
import FillSpace from '../layout/FillSpace';

const Touchable = styled.TouchableOpacity<{themeName: PossibleThemes}>`
  background-color: transparent;
  padding: ${px2ddp(4.5)}px ${px2ddp(20)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${() => `${px2ddp(10)}px`};
  border-width: 2px;
  border-color: ${({themeName, theme}) => (themeName === 'light' ? theme.black : theme.white)};
`;

interface AppleButtonProps extends TouchableOpacityProps {}

const AppleButton: React.FC<AppleButtonProps> = props => {
  const {themeName} = useTheme();
  return (
    <Touchable {...props} themeName={themeName}>
      <Row justifyContent="space-around">
        <AppleLogo />
        {Platform.OS === 'web' ? <Space width={px2ddp(10)} /> : <FillSpace />}
        <Typography variant="body" type="bold">
          Continuar com Apple
        </Typography>
      </Row>
    </Touchable>
  );
};

export default AppleButton;
