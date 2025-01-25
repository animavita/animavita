import { AdoptionType } from '@animavita/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';

import { useNavigation } from '@/navigation/use-navigation';
import { saveOrCreate } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

const useAdoptions = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const client = useQueryClient();

  const mutation = useMutation(saveOrCreate, {
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.getAllAdoptions]);
      navigation.navigate('Home');
    },
    onError: () => toast.show({ description: 'Error while saving adoption!' }),
  });

  const saveOrCreateAdoption = async (adoption: Partial<AdoptionType>) => {
    return await mutation.mutateAsync(adoption);
  };

  return {
    saving: mutation.isLoading,
    saveOrCreateAdoption,
  };
};

export default useAdoptions;
