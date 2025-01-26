import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuth } from '@/hooks/use-auth-provider';
import { signInRequest } from '@/services/sign-in';

const useUserSignIn = () => {
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: signInRequest,
  });

  const signIn = async (email: string, password: string) => {
    try {
      const response = await mutation.mutateAsync({ email, password });

      const credentials = response.data;

      auth.signIn(credentials);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  const networkErrorMessage = (mutation.error as AxiosError<{ message: string }>)?.response?.data
    .message;

  const error = mutation.isError ? networkErrorMessage || 'Something went wrong, try again!' : null;

  return {
    signIn,
    error,
    isSigningIn: mutation.isLoading,
  };
};

export default useUserSignIn;
