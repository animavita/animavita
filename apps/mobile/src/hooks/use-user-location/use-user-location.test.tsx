import { act, renderHook, waitFor } from '@testing-library/react-native';
import * as Location from 'expo-location';

import useUserLocation, { Warnings } from './use-user-location';

jest.mock('expo-location', () => ({
  ...jest.requireActual('expo-location'),
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({
      granted: false,
      canAskAgain: false,
    })
  ),
  hasServicesEnabledAsync: jest.fn(() => Promise.resolve(false)),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: 32.435, longitude: -98.234 },
    })
  ),
  reverseGeocodeAsync: jest.fn(() =>
    Promise.resolve([{ region: 'Smithtown', subregion: 'New York' }])
  ),
}));

describe('useUserLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when calling `getLocation`', () => {
    it('properly toggles the loading state', async () => {
      const { result } = renderHook(useUserLocation);

      expect(result.current.isLoading).toBeFalsy();

      act(() => {
        result.current.getLocation();
      });

      expect(result.current.isLoading).toBeTruthy();

      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    });
  });

  describe('when services are not enabled', () => {
    it('asks user to enable GPS', async () => {
      const { result } = renderHook(useUserLocation);

      await act(async () => {
        await result.current.getLocation();
      });

      expect(result.current.warning).toBe(Warnings.GPS_DISABLED);
    });
  });

  describe('when user does not grant permission and we can not ask again', () => {
    it('warns the user that this permission is mandatory', async () => {
      jest.mocked(Location.hasServicesEnabledAsync).mockResolvedValueOnce(true);

      const { result } = renderHook(useUserLocation);

      await act(async () => {
        await result.current.getLocation();
      });

      expect(result.current.warning).toBe(Warnings.LOCATION_REQUIRED);
    });
  });

  describe('when user grants the permission', () => {
    it('sets user address without errors', async () => {
      // @ts-ignore
      jest.mocked(Location.requestForegroundPermissionsAsync).mockResolvedValueOnce({
        granted: true,
        canAskAgain: false,
      });

      jest.mocked(Location.hasServicesEnabledAsync).mockResolvedValueOnce(true);

      const { result } = renderHook(useUserLocation);

      await act(async () => {
        await result.current.getLocation();
      });

      expect(result.current.error).toBeUndefined();

      expect(result.current.address).toStrictEqual({ city: 'Smithtown', state: 'New York' });
    });
  });

  describe('when something goes wrong calling `getLocation`', () => {
    it('sets the error message', async () => {
      const { result } = renderHook(useUserLocation);
      jest
        .mocked(Location.hasServicesEnabledAsync)
        .mockRejectedValueOnce({ message: 'an error happened!' });

      await act(async () => {
        await result.current.getLocation();
      });

      expect(result.current.error).toBe('an error happened!');
    });
  });
});
