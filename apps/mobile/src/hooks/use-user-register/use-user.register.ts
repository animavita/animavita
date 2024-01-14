import { Coordinates, UserType } from '@animavita/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuth } from '../use-auth-provider';

import { signUp } from '@/services/sign-up';

const useUserRegister = () => {
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: signUp,
  });

  const registerUser = async (
    user: Pick<UserType, 'name' | 'email' | 'password'>,
    coords: Coordinates
  ) => {
    const newUser = { ...user, location: coords };
    const response = await mutation.mutateAsync(newUser);
    const credentials = response.data;

    auth.signIn(credentials);
  };

  const networkErrorMessage = (mutation.error as AxiosError<{ message: string }>)?.response?.data
    .message;

  return {
    registerUser,
    isRegistering: mutation.isLoading,
    error: networkErrorMessage || 'Something went wrong, try again!',
  };
};

export default useUserRegister;
