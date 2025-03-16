import { UserType } from '@animavita/types';

import client from './http-client';

export const getCurrentUserInfo = () => {
  return client.get<Pick<UserType, 'name' | 'location'>>('/auth/me');
};
