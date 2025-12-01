import { Coordinates, SignUpRequest, SignUpResponse, UserType } from '@animavita/types';

import client from './http-client';

export const signUp = (user: SignUpRequest) => {
  return client.post<SignUpResponse>('/auth/signUp', user);
};

export const completeSignUp = (data: {
  location?: Coordinates;
  role?: UserType['role'];
  phoneNumber?: UserType['phoneNumber'];
}) => {
  let payload = {};

  if (data.location) {
    payload = { ...payload, location: data.location };
  }

  if (data.role) {
    payload = { ...payload, role: data.role };
  }

  if (data.phoneNumber) {
    payload = { ...payload, phoneNumber: data.phoneNumber };
  }

  return client.post<{
    location: Coordinates;
    role: UserType['role'];
    phoneNumber: UserType['phoneNumber'];
  }>('/auth/completeSignUp', payload);
};
