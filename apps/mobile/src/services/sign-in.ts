import { SignInRequest, SignInResponse } from '@animavita/types';

import client from './http-client';

export const signInRequest = (user: SignInRequest) => {
  return client.post<SignInResponse>('/auth/signIn', user);
};
