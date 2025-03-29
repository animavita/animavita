import { screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import { Text } from 'react-native';

import { AuthContext, AuthProvider } from '.';

import { getUserCredentials } from '@/helpers/secure-store';
import { renderWithProviders } from '@/test/test-utils';

jest.mock('@/helpers/secure-store', () => ({
  getUserCredentials: jest.fn(() => null),
}));

const setup = async () => {
  return renderWithProviders(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => {
          const { accessToken, refreshToken } = value.tokens || {};
          const { name } = value.user || {};

          return (
            <>
              <Text>access token: {accessToken}</Text>
              <Text>refresh token: {refreshToken}</Text>
              <Text>name: {name}</Text>
              <Text>status: {JSON.stringify(value.status)}</Text>
            </>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

describe('AuthProvider native', () => {
  beforeEach(jest.clearAllMocks);

  it('user token/info is undefined by default', async () => {
    setup();

    expect(screen.getByText('access token:')).toBeTruthy();
    expect(screen.getByText('refresh token:')).toBeTruthy();
    expect(screen.getByText('name:')).toBeTruthy();

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
      (getUserCredentials as jest.Mock).mockReturnValue({
        accessToken: '123-abc',
        refreshToken: 'abc-123',
      });

      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.queryByText('access token: 123-abc')).toBeOnTheScreen();
      expect(screen.queryByText('refresh token: abc-123')).toBeOnTheScreen();
      expect(screen.queryByText('name: John')).toBeOnTheScreen();
      expect(screen.queryByText('status: "LOGGED"')).toBeOnTheScreen();
    });
  });
});
