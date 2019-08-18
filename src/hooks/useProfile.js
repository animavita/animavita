import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useProfile = () => {
  const [user, setUser] = useState({});

  const getUserProfile = async () => {
    const { user: storagedUser } = JSON.parse(await AsyncStorage.getItem('@animativa:user'));
    const { name, email, avatar } = storagedUser;
    const [firstName, lastName] = name.split(' ');
    const userData = {
      name: firstName,
      lastName,
      email,
      avatar,
    };

    setUser(userData);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return user;
};

export default useProfile;
