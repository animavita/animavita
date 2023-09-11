import * as Location from 'expo-location';

export const getLocationModuleMock = () => {
  const mockedAddress: Location.LocationGeocodedAddress = {
    city: 'City',
    country: 'Country',
    district: 'District',
    postalCode: 'mocked',
    region: 'mocked',
    street: 'mocked',
    subregion: 'mocked',
    streetNumber: 'mocked',
  } as unknown as Location.LocationGeocodedAddress;

  const denyPermissions = () =>
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      granted: false,
      canAskAgain: false,
    });

  const grantPermissions = () =>
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      granted: true,
      canAskAgain: false,
    });

  const enableGPS = () => (Location.hasServicesEnabledAsync as jest.Mock).mockResolvedValue(true);
  const disableGPS = () => (Location.hasServicesEnabledAsync as jest.Mock).mockResolvedValue(false);

  const responseWithAddress = () => {
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 12.075474504,
        longitude: 34.075474504,
      },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue(mockedAddress);
  };

  const responseWithoutAddress = () => {
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 12.075474504,
        longitude: 34.075474504,
      },
    });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue(undefined);
  };

  return {
    mockedAddress,
    denyPermissions,
    grantPermissions,
    enableGPS,
    disableGPS,
    responseWithAddress,
    responseWithoutAddress,
  };
};
