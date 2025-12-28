import { CredentialsType } from '@animavita/types';

let credentials: CredentialsType | null = null;

export const getUserCredentials = async (): Promise<CredentialsType | null> => {
  return credentials;
};

export const removeUserCredentials = async (): Promise<void> => {
  credentials = null;
};

export const saveUserCredentials = async (value: CredentialsType): Promise<void> => {
  credentials = value;
};
