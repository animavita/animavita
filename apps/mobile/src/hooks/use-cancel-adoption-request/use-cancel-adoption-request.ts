import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@/navigation/use-navigation';
import { cancelAdoptionRequest } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

export const useCancelAdoptionRequest = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cancelAdoptionRequest,
    onSuccess: () => {
      toast.show({
        title: t('ADOPTION_REQUESTS.ADOPTER.DETAIL.CANCEL_SUCCESS'),
        placement: 'bottom',
        duration: 3000,
      });

      goBack();
    },
    onError: () => {
      toast.show({
        title: t('ADOPTION_REQUESTS.ADOPTER.DETAIL.CANCEL_ERROR'),
        placement: 'bottom',
        duration: 3000,
      });
    },
    // Refetched on failure too: a conflict means the owner decided first, and
    // the list should show that rather than keep offering a Cancel button.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
    },
    retry: false,
  });

  return {
    cancel: (requestId: string) => mutation.mutate(requestId),
    isCancelling: mutation.isPending,
  };
};
