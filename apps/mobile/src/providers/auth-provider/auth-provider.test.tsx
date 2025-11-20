import {
  screen,
  waitForElementToBeRemoved,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { Text } from 'react-native';

import { AuthContext, AuthProvider } from '.';

import { getUserCredentials } from '@/helpers/secure-store';
import { getCurrentUserInfo } from '@/services/user';
import { renderWithProviders } from '@/test/test-utils';

jest.mock('@/helpers/secure-store', () => ({
  getUserCredentials: jest.fn(() => null),
}));

jest.mock('@/services/user', () => ({
  getCurrentUserInfo: jest.fn(async () => ({
    data: {},
  })),
}));

const setup = async () => {
  return renderWithProviders(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => {
          const { accessToken, refreshToken } = value.tokens || {};
          const { name, location, role } = value.user || {};

          return (
            <>
              <Text>access token: {accessToken}</Text>
              <Text>refresh token: {refreshToken}</Text>
              <Text>name: {name}</Text>
              <Text>role: {role}</Text>
              <Text>latitude: {location?.latitude}</Text>
              <Text>longitude: {location?.longitude}</Text>
              <Text>status: {JSON.stringify(value.status)}</Text>
              <Text
                testID="update-location"
                onPress={() => value.completeSignUp({ latitude: 40.7128, longitude: -74.006 })}
              >
                Update Location
              </Text>
              <Text testID="choose-adopter" onPress={() => value.choseRole('adopter')}>
                Choose Adopter
              </Text>
              <Text testID="choose-rescuer" onPress={() => value.choseRole('rescuer')}>
                Choose Rescuer
              </Text>
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

      (getCurrentUserInfo as jest.Mock).mockResolvedValueOnce({
        data: {
          name: 'John',
          role: 'adopter',
          location: { latitude: 0, longitude: 0 },
        },
      });

      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.queryByText('access token: 123-abc')).toBeOnTheScreen();
      expect(screen.queryByText('refresh token: abc-123')).toBeOnTheScreen();
      expect(screen.queryByText('name: John')).toBeOnTheScreen();
      expect(screen.queryByText('role: adopter')).toBeOnTheScreen();
      expect(screen.queryByText('latitude: 0')).toBeOnTheScreen();
      expect(screen.queryByText('longitude: 0')).toBeOnTheScreen();
      expect(screen.queryByText('status: "LOGGED"')).toBeOnTheScreen();
    });
  });

  describe('location management', () => {
    it('updates user location when completeSignUp is called', async () => {
      (getUserCredentials as jest.Mock).mockReturnValue({
        accessToken: '123-abc',
        refreshToken: 'abc-123',
      });

      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.getByText('latitude:')).toBeOnTheScreen();
      expect(screen.getByText('longitude:')).toBeOnTheScreen();

      const updateButton = screen.getByTestId('update-location');
      fireEvent.press(updateButton);

      expect(screen.getByText('latitude: 40.7128')).toBeOnTheScreen();
      expect(screen.getByText('longitude: -74.006')).toBeOnTheScreen();
    });
  });

  describe('role management', () => {
    it('updates user role when choseRole is called', async () => {
      (getUserCredentials as jest.Mock).mockReturnValue({
        accessToken: '123-abc',
        refreshToken: 'abc-123',
      });

      setup();

      await waitForElementToBeRemoved(() => screen.getByText('status: "IDLE"'));

      expect(screen.getByText('role:')).toBeOnTheScreen();

      const adopterButton = screen.getByTestId('choose-adopter');
      fireEvent.press(adopterButton);

      expect(screen.getByText('role: adopter')).toBeOnTheScreen();

      const rescuerButton = screen.getByTestId('choose-rescuer');
      fireEvent.press(rescuerButton);

      expect(screen.getByText('role: rescuer')).toBeOnTheScreen();
    });
  });
});
