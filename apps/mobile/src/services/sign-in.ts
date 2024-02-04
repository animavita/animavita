import { SignInRequest, SignInResponse } from '@animavita/types';

import client from './http-client';

export const signInRequest = (user: SignInRequest) => {
  return client.post<SignInResponse>('/auth/signIn', user);
};

export const persistUserToken = (token: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
