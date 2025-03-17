import { Coordinates, UserType } from '@animavita/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuth } from '../use-auth-provider';

import { useNavigation } from '@/navigation/use-navigation';
import { completeSignUp, signUp } from '@/services/sign-up';

const useUserRegister = () => {
  const auth = useAuth();
  const { navigate } = useNavigation();

  const mutation = useMutation({
    mutationFn: signUp,
  });

  const completeSignUpMutation = useMutation({
    mutationFn: completeSignUp,
    onSuccess: () => navigate('Home'),
  });

  const registerUser = async (user: Pick<UserType, 'name' | 'email' | 'password'>) => {
    const response = await mutation.mutateAsync(user);
    const credentials = response.data;

    auth.signIn(credentials);
  };

  const complete = async (coordinates: Coordinates) => {
    const response = await completeSignUpMutation.mutateAsync({ location: coordinates });
    auth.completeSignUp(response.data.location);
  };

  const networkErrorMessage = (mutation.error as AxiosError<{ message: string }>)?.response?.data
    .message;

  const error = mutation.isError ? networkErrorMessage || 'Something went wrong, try again!' : null;

  return {
    registerUser,
    isRegistering: mutation.isLoading,
    complete,
    error,
  };
};

export default useUserRegister;
