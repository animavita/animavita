import React from 'react';

import { View } from 'react-native';
import { H1, Title } from '~/components';
import GradientButton from '~/components/GradientButton';
import { Container } from './styles';
import { THEME_COLORS } from '~/utils/constants';

const Login = () => (
  <Container>
    <H1>Your home.</H1>
    <Title size={26} color={THEME_COLORS.SECONDARY}>
      Greener
    </Title>
    <GradientButton onPress={() => setFinishStep(false)}>
      <Title size={12} color="white">
        Entrar com facebook
      </Title>
    </GradientButton>
  </Container>
);

export default Login;
