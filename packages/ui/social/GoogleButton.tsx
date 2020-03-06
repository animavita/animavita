import {px2ddp, useTheme, PossibleThemes} from '@animavita/theme';
import styled from 'styled-components/native';
import {Platform, TouchableOpacityProps} from 'react-native';
import React from 'react';

import Typography from '../core/Typography';
import Row from '../layout/Row';
import GoogleLogo from '../assets/icons/GoogleLogo';
import Space from '../layout/Space';
import FillSpace from '../layout/FillSpace';

const Touchable = styled.TouchableOpacity<{themeName: PossibleThemes}>`
  background-color: transparent;
  padding: ${px2ddp(5)}px ${px2ddp(15)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${() => `${px2ddp(10)}px`};
  border-width: 2px;
  border-color: ${({themeName, theme}) => (themeName === 'light' ? theme.black : theme.white)};
`;

type GoogleButtonProps = TouchableOpacityProps;

const GoogleButton: React.FC<GoogleButtonProps> = props => {
  const {themeName} = useTheme();
  return (
    <Touchable {...props} themeName={themeName}>
      <Row justifyContent="space-around">
        <GoogleLogo />
        <Space width={px2ddp(10)} />
        <Typography variant="body" type="bold">
          Continuar com Google
        </Typography>
      </Row>
    </Touchable>
  );
};

export default GoogleButton;
