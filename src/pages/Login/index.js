import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { H1, Title } from '~/components';
import GradientButton from '~/components/GradientButton';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';
import { handleLoginFacebook } from '~/services/authFacebook';
import { Container } from './styles';

const Login = ({ navigation }) => {
  const [loading, useLoading] = useState(false);

  async function handleLogin() {
    useLoading(true);

    const user = JSON.parse(await AsyncStorage.getItem('@animavita:facebook_user'));

    if (user) {
      navigation.navigate('Home');
    } else {
      const response = await handleLoginFacebook();

      if (response.error) {
        console.log(response.error);
      }

      if (response.user) {
        await AsyncStorage.setItem('@animativa:facebook_user', JSON.stringify(response.user));
        navigation.navigate('Home');
      }
    }
  }

  return (
    <Container>
      <H1>Your home.</H1>
      <Title size={26} color={THEME_COLORS.SECONDARY}>
        Greener
      </Title>
      <GradientButton onPress={() => handleLogin()} loading={loading}>
        <Title size={12} color="white">
          Entrar com facebook
        </Title>
      </GradientButton>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
