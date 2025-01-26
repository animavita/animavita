import { AdoptionType } from '@animavita/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';

import useLocale from '../use-locale';

import { useNavigation } from '@/navigation/use-navigation';
import { saveOrCreate } from '@/services/adoptions';
import { getMyPets } from '@/services/pets';
import { QUERY_KEYS } from '@/services/query-keys';

const usePets = () => {
  const { t } = useLocale();
  const navigation = useNavigation();
  const toast = useToast();
  const client = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEYS.getMyPets],
    queryFn: getMyPets,
  });

  const mutation = useMutation(saveOrCreate, {
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.getMyPets]);
      navigation.navigate('Home');
    },
    onError: () => {
      toast.show({ description: t('REGISTER_ADOPTION.FORM_ERROR_MESSAGES.GENERIC_ERROR') });
    },
  });

  const saveOrCreatePet = async (pet: Partial<AdoptionType>) => {
    return await mutation.mutateAsync(pet);
  };

  return {
    loading: query.isFetching,
    myPets: query.data?.data || [],
    saving: mutation.isLoading,
    saveOrCreatePet,
  };
};

export default usePets;
