import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { H1, Title } from '~/components';
import GradientButton from '~/components/GradientButton';
import { Container } from './styles';
import { THEME_COLORS } from '~/utils/constants';

import { handleLoginFacebook } from '~/services/authFacebook';

const Login = ({ navigation }) => {
  async function handleLogin() {
    const response = await handleLoginFacebook();

    if (response.error) {
      console.log(response.error);
    }

    if (response.user) {
      await AsyncStorage.setItem('@animativa:facebook_user', JSON.stringify(response.user));
      navigation.navigate('Home');
    }
  }

  return (
    <Container>
      <H1>Your home.</H1>
      <Title size={26} color={THEME_COLORS.SECONDARY}>
        Greener
      </Title>
      <GradientButton onPress={() => handleLogin()}>
        <Title size={12} color="white">
          Entrar com facebook
        </Title>
      </GradientButton>
    </Container>
  );
};

export default Login;
