import { UserType } from '@animavita/types';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from './use-auth-provider';

import { OtpService } from '@/services/otp';

const useOtpVerification = () => {
  const { updatePhoneNumber } = useAuth();

  const requestOtpMutation = useMutation({
    mutationFn: OtpService.requestOtp,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: OtpService.verifyOtp,
  });

  const requestOtp = async (phoneNumber: UserType['phoneNumber']) => {
    await requestOtpMutation.mutateAsync(phoneNumber);
  };

  const verifyOtp = async (phoneNumber: UserType['phoneNumber'], otp: string) => {
    const { data } = await verifyOtpMutation.mutateAsync({ phoneNumber, otp });
    updatePhoneNumber(data.phoneNumber);
    return data.phoneNumber;
  };

  return {
    requestOtp,
    verifyOtp,
    isLoading: requestOtpMutation.isLoading || verifyOtpMutation.isLoading,
  };
};

export default useOtpVerification;
