import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { H1, Title } from '~/components';
import { showMessage } from 'react-native-flash-message';
import GradientButton from '~/components/GradientButton';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';
import { handleLoginFacebook } from '~/services/authFacebook';
import Swiper from 'react-native-swiper';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Footer, Terms, styles } from './styles';

const Login = ({ navigation }) => {
  const [loading, useLoading] = useState(false);

  function redirectUser() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignedIn' })],
    });
    navigation.dispatch(resetAction);
  }

  async function handleLogin() {
    useLoading(true);

    const user = JSON.parse(await AsyncStorage.getItem('@animavita:facebook_user'));
    if (user) {
      redirectUser();
    } else {
      const response = await handleLoginFacebook();

      if (response.error) {
        showMessage({
          message: 'Erro na autenticação!',
          description:
            'Ops! Algum erro no momento da autenticação aconteceu, tente novamente mais tarde.',
          type: 'danger',
        });
      }
      if (response.user) {
        await AsyncStorage.setItem('@animativa:facebook_user', JSON.stringify(response.user));
        redirectUser();
      }
    }
  }

  return (
    <Container>
      <Header>
        <H1>
          Salve uma vida.
        </H1>
          <Title size={26} color={THEME_COLORS.SECONDARY}>
            Animavita
          </Title>
      </Header>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('~/images/loginImage.jpg')}
      />
      <Footer>
        <GradientButton onPress={() => handleLogin()} disabled={false} loading={loading}>
          <Title size={12} color="white">
            Entrar com facebook
          </Title>
        </GradientButton>
        <Terms hitSlop={{top: 10, bottom: 10, left: 30, right: 30 }}>
          <Title size={12} color={THEME_COLORS.GREY} weight="normal">
            Termos de uso
          </Title>
        </Terms>
      </Footer>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
