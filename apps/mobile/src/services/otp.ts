import { Coordinates, UserType } from '@animavita/types';

import client from './http-client';

const requestOtp = (phoneNumber: UserType['phoneNumber']) => {
  return client.post('/phone-number/send-otp-code', { phoneNumber });
};

const verifyOtp = (data: { phoneNumber: UserType['phoneNumber']; otp: string }) => {
  return client.post<{
    location: Coordinates;
    role: UserType['role'];
    phoneNumber: UserType['phoneNumber'];
  }>('/phone-number/verify-otp-code', {
    phoneNumber: data.phoneNumber,
    otpCode: data.otp,
  });
};

export const OtpService = {
  requestOtp,
  verifyOtp,
};
