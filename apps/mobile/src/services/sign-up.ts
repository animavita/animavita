import { Coordinates, SignUpRequest, SignUpResponse } from '@animavita/types';

import client from './http-client';

export const signUp = (user: SignUpRequest) => {
  return client.post<SignUpResponse>('/auth/signUp', user);
};

export const completeSignUp = (data: { location: Coordinates }) => {
  return client.post<{ location: Coordinates }>('/auth/completeSignUp', data);
};
