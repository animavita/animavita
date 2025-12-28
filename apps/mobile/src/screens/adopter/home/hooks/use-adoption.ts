import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPetAdoption } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';
import { useNewRequestsStore } from '@/state/requests/requests.store';

export const useAdoption = () => {
  const queryClient = useQueryClient();
  const setHasNewRequests = useNewRequestsStore((state) => state.setHasNewRequests);

  const adoptionMutation = useMutation({
    mutationFn: requestPetAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.petsNearMe] });
      setHasNewRequests(true);
    },
    onError: (error) => {
      console.error('Failed to request adoption:', error);
    },
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
