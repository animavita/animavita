import * as SecureStore from 'expo-secure-store';

import { UserToken } from '../providers/auth-provider';

type KeyType = string;

const userTokenKey = 'userToken';

const getValueFor = async <T>(key: KeyType): Promise<T | null> => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};

const removeValueFor = async (key: KeyType) => {
  return await SecureStore.deleteItemAsync(key);
};

const save = async <T>(key: KeyType, value: T) => {
  const stringfiedValue = JSON.stringify(value);
  return await SecureStore.setItemAsync(key, stringfiedValue);
};

export const getUserToken = () => getValueFor<UserToken>(userTokenKey);
export const removeUserToken = () => removeValueFor(userTokenKey);
export const saveUserToken = (value: UserToken) => save(userTokenKey, value);
