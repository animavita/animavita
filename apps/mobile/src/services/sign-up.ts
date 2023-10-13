import { SignUpRequest } from '@animavita/types';

import client from './http-client';

export const signUp = (user: SignUpRequest) => {
  return client.post('/auth/signUp', user);
};
