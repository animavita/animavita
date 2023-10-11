import { UserType } from '@animavita/types';

import client from './http-client';

export const signUp = (user: UserType) => {
  return client['post']('/auth/signUp', user);
};
