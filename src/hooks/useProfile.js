import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useProfile = () => {
  const [user, setUser] = useState({});

  const getUserProfile = async () => {
    const { name, email, picture } = JSON.parse(
      await AsyncStorage.getItem('@animativa:facebook_user'),
    );
    const [firstName, lastName] = name.split(' ');
    const storageUser = {
      name: firstName,
      avatar: picture.data.url,
      email,
      lastName,
    };

    setUser(storageUser);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return user;
};

export default useProfile;
