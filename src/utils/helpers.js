import AsyncStorage from '@react-native-community/async-storage';

export const sanitizeUsername = (name) => {
  if (name && name.length > 8) {
    return `\n ${name}`;
  }

  return name;
};

export const getUser = async () => JSON.parse(await AsyncStorage.getItem('@animativa:user'));
