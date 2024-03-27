import { Coordinates } from '@animavita/types';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Platform } from 'react-native';
import { reverseGeocoding } from '@/services/reverse-geocoding';

type Address = {
  city: string | null;
  state: string | null;
};

export enum Warnings {
  GPS_DISABLED,
  LOCATION_REQUIRED,
}

const useUserLocation = () => {
  const [address, setAddress] = useState<Address>();
  const [coords, setCoords] = useState<Coordinates>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [warning, setWarning] = useState<Warnings>();

  const getLocation = async () => {
    try {
      setIsLoading(true);

      const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      const hasServicesEnabled = await Location.hasServicesEnabledAsync();

      if (!hasServicesEnabled) {
        setWarning(Warnings.GPS_DISABLED);

        return;
      }

      if (!granted && !canAskAgain) {
        setWarning(Warnings.LOCATION_REQUIRED);

        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setCoords({ latitude, longitude });

      let userAddress:Address[] | any;

      if (Platform.OS === 'web') {
        try {
          const response = await reverseGeocoding({
            latitude,
            longitude,
          });
          userAddress = response.data;
        } catch (error) {
          setErrorMessage((error as Error).message);
        }
      } else {
        userAddress = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

      }

      const addresses: Address[] = userAddress.map((address: any) => ({
        city: address.region,
        state: address.subregion,
      }));

      setAddress(addresses[0]);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    coords,
    isLoading,
    address,
    getLocation,
    error: errorMessage,
    warning,
  };
};

export default useUserLocation;
