import React, { useState } from 'react';
import { Creators as AuthCreators } from '~/store/ducks/auth';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { H1, Title } from '~/components';
import { showMessage } from 'react-native-flash-message';
import GradientButton from '~/components/GradientButton';
import PropTypes from 'prop-types';
import { THEME_COLORS } from '~/utils/constants';
import { handleLoginFacebook } from '~/services/authFacebook';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Container, Header, Footer, Terms, styles,
} from './styles';

const USER_LOGIN_MUTATION = gql`
  mutation SignInWithFacebookMutation($accessToken: String!) {
    SignInWithFacebookMutation(input: { accessToken: $accessToken }) {
      user {
        _id
        name
        lastname
        avatar
        email
        hero
        notifications

      }
      token
    }
  }
`;

const Login = ({ navigation }) => {
  const [loader, useLoading] = useState(false);
  const dispatch = useDispatch();

  async function saveAuthenticatedUser(data) {
    await AsyncStorage.setItem(
      '@animavita:authToken',
      JSON.stringify(data.token),
    );
    dispatch(AuthCreators.setAuth(data.user));
  }

  function throwAuthenticationError() {
    showMessage({
      message: 'Erro na autenticação!',
      description:
        'Ops! Algum erro no momento da autenticação aconteceu, tente novamente mais tarde.',
      type: 'danger',
    });
    useLoading(false);
  }

  const [loginUser] = useMutation(USER_LOGIN_MUTATION, {
    onCompleted: ({ SignInWithFacebookMutation }) => {
      saveAuthenticatedUser(SignInWithFacebookMutation);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignedIn' })],
      });
      navigation.dispatch(resetAction);
    },
    onError: () => throwAuthenticationError(),
  });

  async function handleLogin() {
    useLoading(true);

    const response = await handleLoginFacebook();

    if (response.error) {
      throwAuthenticationError();
    }

    if (response.user) {
      const { accessToken } = JSON.parse(await AsyncStorage.getItem('@facebook:accessData'));
      await AsyncStorage.setItem('@animavita:facebook_user', JSON.stringify(response.user));

      loginUser({
        variables: { accessToken },
      });
    }
  }

  return (
    <Container>
      <Header>
        <H1>Salve uma vida.</H1>
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
        <GradientButton onPress={() => handleLogin()} disabled={loader} loading={loader}>
          <Title size={12} color="white">
            Entrar com facebook
          </Title>
        </GradientButton>
        <Terms
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 30,
            right: 30,
          }}
          onPress={() => console.log('pressed')}
        >
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
