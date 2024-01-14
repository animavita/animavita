import { Coordinates } from '@animavita/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useToast } from 'native-base';

import { useAuth } from '../use-auth-provider';

import { GetLocationScreenParamList } from '@/navigation/types';
import { signUp } from '@/services/sign-up';

const useUserRegister = () => {
  const toast = useToast();
  const auth = useAuth();
  const { params: data } = useRoute<RouteProp<GetLocationScreenParamList, 'GetLocation'>>();

  const mutation = useMutation({
    mutationFn: signUp,
    onError: () => toast.show({ title: 'Something went wrong, try again!', variant: 'solid' }),
  });

  const registerUser = async (coords: Coordinates) => {
    const newUser = { ...data.user, location: coords };
    const response = await mutation.mutateAsync(newUser);
    const user = response.data;

    auth.signIn(user);
  };

  return {
    registerUser,
  };
};

export default useUserRegister;