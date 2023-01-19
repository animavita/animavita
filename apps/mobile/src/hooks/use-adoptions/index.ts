import { AdoptionType } from '@animavita/models';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';

import Routes from '../../routes';
import { saveOrCreate, getAllAdoptions } from '../../services/adoptions';
import { QUERY_KEYS } from '../../services/query-keys';

export default function useAdoptions() {
  const navigation = useNavigation();
  const toast = useToast();
  const client = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEYS.getAllAdoptions],
    queryFn: getAllAdoptions,
  });

  const mutation = useMutation(saveOrCreate, {
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.getAllAdoptions]);
      navigation.navigate(Routes.Home);
    },
    onError: () => toast.show({ description: 'Error while saving adoption!' }),
  });

  const saveOrCreateAdoption = async (adoption: Partial<AdoptionType>) => {
    return await mutation.mutateAsync(adoption);
  };

  return {
    loading: query.isFetching,
    adoptions: query.data?.data,
    saving: mutation.isLoading,
    saveOrCreateAdoption,
  };
}
