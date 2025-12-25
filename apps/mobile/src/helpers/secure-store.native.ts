import { CredentialsType } from '@animavita/types';
import * as SecureStore from 'expo-secure-store';

type KeyType = string;

const userCredentialsKey = 'userCredentials';

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

export const getUserCredentials = () => getValueFor<CredentialsType>(userCredentialsKey);
export const removeUserCredentials = () => removeValueFor(userCredentialsKey);
export const saveUserCredentials = (value: CredentialsType) => save(userCredentialsKey, value);
