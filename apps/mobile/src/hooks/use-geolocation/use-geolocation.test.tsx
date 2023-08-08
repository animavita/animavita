import { act, renderHook } from '@testing-library/react-native';
import * as Location from 'expo-location';

import { useGeolocation } from '.';

jest.mock('expo-location');

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an error message when user do not grant permissions', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useGeolocation());

    await act(() => {
      result.current.getUserLocation();
    });

    expect(result.current.errorMsg).toEqual('Permission to access location was denied');
  });

  it('returns the current location when user grant permissions', async () => {
    const mockedLocation = {
      city: '',
      district: '',
      streetNumber: '',
      street: '',
      region: '',
      subregion: '',
      country: '',
      postalCode: '',
      name: '',
      isoCountryCode: '',
      timezone: '',
    };

    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        longitude: 141234,
        latitude: 1213214,
      },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue(mockedLocation);

    const { result } = renderHook(() => useGeolocation());

    await act(() => {
      result.current.getUserLocation();
    });

    expect(result.current.location).toEqual(mockedLocation);
  });

  it('returns a undefined value if there is no address', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValue(undefined);

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useGeolocation());

    await act(() => {
      result.current.getUserLocation();
    });

    expect(result.current.location).toEqual(undefined);
  });
});
