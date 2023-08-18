import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';

import useLocale from '../use-locale';

export const useGeolocation = () => {
  const [address, setAddress] = useState<Location.LocationGeocodedAddress[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useLocale();

  const errorAlert = (msg: string) =>
    Alert.alert('Error', msg, [
      {
        text: 'Go to settings',
        onPress: () => Linking.openSettings(),
        style: 'cancel',
      },
    ]);

  const getLocation = async () => {
    try {
      setIsLoading(true);

      const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      const hasServicesEnabled = await Location.hasServicesEnabledAsync();

      if (!hasServicesEnabled) {
        errorAlert(t('SHARE_LOCATION.ERRORS_MSG.LOCATION_SERVICE_DISABLED'));

        return;
      }

      if (!granted && !canAskAgain) {
        errorAlert(t('SHARE_LOCATION.ERRORS_MSG.LOCATION_SERVICE_DENIED'));

        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      const userAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (userAddress) setAddress(userAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    address,
    getLocation,
  };
};
