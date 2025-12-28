import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';

import { requestPetAdoption } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';
import { useNewRequestsStore } from '@/state/requests/requests.store';

type UseAdoptionProps = {
  onAdoptionError?: (petId: string) => void;
};

export const useAdoption = ({ onAdoptionError }: UseAdoptionProps = {}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { t } = useTranslation();
  const setHasNewRequests = useNewRequestsStore((state) => state.setHasNewRequests);

  const adoptionMutation = useMutation({
    mutationFn: requestPetAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.petsNearMe] });
      setHasNewRequests(true);
    },
    onError: (_error, petId) => {
      onAdoptionError?.(petId);

      toast.show({
        title: t('HOME.ADOPTION_REQUEST_ERROR'),
        placement: 'bottom',
        duration: 3000,
      });
    },
    retry: false,
  });

  const pass = (petId: string) => {
    // TODO: Call pass/skip API endpoint with petId
  };

  const like = (petId: string) => {
    // TODO: Trigger add to favorites API call with petId
  };

  const adopt = (petId: string) => {
    adoptionMutation.mutate(petId);
  };

  return {
    pass,
    like,
    adopt,
    isRequesting: adoptionMutation.isPending,
  };
};
