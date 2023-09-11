import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';

export const useGeolocation = () => {
  const [address, setAddress] = useState<Location.LocationGeocodedAddress[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorAlert = (msg: string, onPress: () => void, text?: string) =>
    Alert.alert('Error', msg, [
      {
        text,
        onPress,
        style: 'cancel',
      },
    ]);

  const getLocation = async () => {
    try {
      setIsLoading(true);

      const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      const hasServicesEnabled = await Location.hasServicesEnabledAsync();

      if (!hasServicesEnabled) {
        errorAlert('Por favor, verifique se o seu GPS está habilitado!', () => {
          Location.enableNetworkProviderAsync();
        });

        return;
      }

      if (!granted && !canAskAgain) {
        errorAlert(
          'A sua localização é realmente necessária para uma melhor experiência no app.',
          () => {
            Linking.openSettings();
          },
          'Go to settings'
        );

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
      console.log((error as Error).message);
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
