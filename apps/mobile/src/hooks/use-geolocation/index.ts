import * as Location from 'expo-location';
import { useState } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location.LocationGeocodedAddress[] | null>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const requestUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    return status;
  };

  const getUserLocation = async () => {
    const status = await requestUserLocation();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const userPosition = await Location.getLastKnownPositionAsync({});

    if (userPosition) {
      const address = await Location.reverseGeocodeAsync({
        latitude: userPosition.coords.latitude,
        longitude: userPosition.coords.longitude,
      });

      setLocation(address);
      setErrorMsg('');
    }
  };

  return {
    location,
    getUserLocation,
    errorMsg,
  };
};
