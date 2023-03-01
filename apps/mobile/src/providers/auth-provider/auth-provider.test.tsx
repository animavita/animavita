import { render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import { Text } from 'react-native';

import { AuthContext, AuthProvider } from '.';
import { getUserToken } from '../../helpers/secure-store';

jest.mock('../../helpers/secure-store', () => ({
  getUserToken: jest.fn(() => null),
}));

const setup = async () =>
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => (
          <>
            <Text>user token: {JSON.stringify(value.userToken)}</Text>
            <Text>status: {JSON.stringify(value.status)}</Text>
          </>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );

describe('AuthProvider', () => {
  it('user token is null by default', async () => {
    setup();

    expect(screen.getByText('user token: null')).toBeTruthy();

    await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));
  });

  it('status is IDLE by default', async () => {
    setup();

    expect(screen.getByText('status: "IDLE"')).toBeTruthy();

    await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));
  });

  describe('if no token found', () => {
    it('logs the user out', async () => {
      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.queryByText('status: "NOT_LOGGED"')).toBeOnTheScreen();
    });
  });

  describe('when the token is found', () => {
    it('logs the user in by storing their token', async () => {
      (getUserToken as jest.Mock).mockReturnValueOnce('123-abc');

      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.queryByText('user token: "123-abc"')).toBeOnTheScreen();
      expect(screen.queryByText('status: "LOGGED"')).toBeOnTheScreen();
    });
  });
});
