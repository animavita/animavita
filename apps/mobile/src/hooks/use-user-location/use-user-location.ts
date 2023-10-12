import * as Location from 'expo-location';
import { useState } from 'react';

import { Coordinates } from '@animavita/shared/types';

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
  const [coords, setCoors] = useState<Coordinates>();
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

      setCoors({ latitude, longitude });

      const userAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (userAddress) {
        const addresses = userAddress.map((address) => ({
          city: address.region,
          state: address.subregion,
        }));

        setAddress(addresses[0]);
      }
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
