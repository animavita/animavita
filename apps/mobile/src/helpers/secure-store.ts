import * as SecureStore from 'expo-secure-store';

import { UserPayload } from '../providers/auth-provider/auth-provider.types';

type KeyType = string;

const userKey = 'userInfo';

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

export const getUser = () => getValueFor<UserPayload>(userKey);
export const removeUser = () => removeValueFor(userKey);
export const saveUser = (value: UserPayload) => save(userKey, value);
