import React from 'react';
import { render, fireEvent, wait, waitForElement } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';

import Wrapper from '../../helpers/Wrapper';
import { handleLoginFacebook } from '../../src/services/authFacebook';
import Login, { USER_LOGIN_MUTATION } from '~/pages/Login/index';
import { createApolloStore } from '../../fixtures/login';

const navigation = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
};
jest.mock('../../src/services/authFacebook');
jest.mock('@react-native-community/async-storage');
jest.mock('react-native-flash-message');

describe('Login', () => {
  const renderComponent = () => {
    const mockStore = configureStore();
    const store = mockStore({});
    const apolloStore = createApolloStore(USER_LOGIN_MUTATION);

    const component = (
      <Wrapper apolloStore={apolloStore} reduxStore={store}>
        <Login navigation={navigation} />
      </Wrapper>
    );

    return render(component);
  };

  it('shows loading when press login button', async () => {
    const { getByText, getByTestId } = renderComponent();

    const btn = getByText('Entrar com facebook');

    fireEvent.press(btn);

    await waitForElement(() => getByTestId('loading'));
  });

  describe('when login is successful', () => {
    beforeEach(() => {
      handleLoginFacebook.mockImplementation(() => ({
        error: false,
        user: true,
      }));
    });

    it('handle properly the login flow', async () => {
      const { getByText } = renderComponent();

      const btn = getByText('Entrar com facebook');

      fireEvent.press(btn);

      await wait();

      expect(handleLoginFacebook).toHaveBeenCalled();
      expect(AsyncStorage.getItem).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('when login fails', () => {
    beforeEach(() => {
      handleLoginFacebook.mockImplementation(() => ({
        error: true,
        user: false,
      }));
    });

    const flashMessage = {
      message: 'Erro na autenticação!',
      description: 'Ops! Algum erro no momento da autenticação aconteceu, tente novamente mais tarde.',
      type: 'danger',
    };

    it('handle properly the login flow', async () => {
      const { getByText } = renderComponent();

      const btn = getByText('Entrar com facebook');

      fireEvent.press(btn);

      await wait();

      expect(handleLoginFacebook).toHaveBeenCalled();
      expect(showMessage).toHaveBeenCalledWith(flashMessage);
    });
  });
});
