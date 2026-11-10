import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@/navigation/use-navigation';
import { denyAdoptionRequest } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

export const useDenyAdoptionRequest = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: denyAdoptionRequest,
    onSuccess: () => {
      toast.show({
        title: t('ADOPTION_REQUESTS.OWNER.DETAIL.DENY_SUCCESS'),
        placement: 'bottom',
        duration: 3000,
      });

      goBack();
    },
    onError: () => {
      toast.show({
        title: t('ADOPTION_REQUESTS.OWNER.DETAIL.DENY_ERROR'),
        placement: 'bottom',
        duration: 3000,
      });
    },
    // Refetched on failure as well as success: a denial that lost to a
    // concurrent decision means this screen is stale, and leaving the row
    // showing a Deny button invites the owner to retry something that cannot
    // succeed.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
    },
    retry: false,
  });

  return {
    deny: (requestId: string) => mutation.mutate(requestId),
    isDenying: mutation.isPending,
  };
};
