import React from 'react';
import { render, fireEvent, wait, waitForElement } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';

import Wrapper from '../../helpers/Wrapper';
import { handleLoginFacebook } from '../../src/services/authFacebook';
import Login, { USER_LOGIN_MUTATION } from '~/pages/Login/index';

const navigation = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
};
jest.mock('../../src/services/authFacebook');
jest.mock('@react-native-community/async-storage');
jest.mock('react-native-flash-message');

describe('Login', () => {
  const mockStore = configureStore();
  const store = mockStore({});
  const apolloStore = [
    {
      request: {
        query: USER_LOGIN_MUTATION,
        variables: { accessToken: '' },
      },
      result: {
        data: {
          SignInWithFacebookMutation: {
            user: {
              _id: 1,
              name: '',
              lastname: '',
              avatar: '',
              email: '',
              hero: '',
              notifications: '',
              address: {
                state: '',
                city: '',
              },
            },
            token: '',
          },
        },
      },
    },
  ];

  const component = (
    <Wrapper apolloStore={apolloStore} reduxStore={store}>
      <Login navigation={navigation} />
    </Wrapper>
  );

  it('shows loading when press login button', async () => {
    const { getByText, getByTestId } = render(component);

    const btn = getByText('Entrar com facebook');

    fireEvent.press(btn);

    await waitForElement(() => getByTestId('loading'));
  });

  it('when login is successful', async () => {
    handleLoginFacebook.mockImplementation(() => ({
      error: false,
      user: true,
    }));

    const { getByText } = render(component);

    const btn = getByText('Entrar com facebook');

    fireEvent.press(btn);

    await wait();

    expect(handleLoginFacebook).toHaveBeenCalled();
    expect(AsyncStorage.getItem).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('when login is not successful', async () => {
    handleLoginFacebook.mockImplementation(() => ({
      error: true,
      user: false,
    }));

    const flashMessage = {
      message: 'Erro na autenticação!',
      description: 'Ops! Algum erro no momento da autenticação aconteceu, tente novamente mais tarde.',
      type: 'danger',
    };

    const { getByText, debug } = render(component);

    const btn = getByText('Entrar com facebook');

    fireEvent.press(btn);

    await wait();

    expect(handleLoginFacebook).toHaveBeenCalled();
    expect(showMessage).toHaveBeenCalledWith(flashMessage);
  });
});
