import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@/navigation/use-navigation';
import { denyAdoptionRequest } from '@/services/adoptions';
import { QUERY_KEYS } from '@/services/query-keys';

export const useDenyRequest = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { t } = useTranslation();
  const { goBack } = useNavigation();

  const leaveWithFreshList = async () => {
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
    goBack();
  };

  const denyMutation = useMutation({
    mutationFn: denyAdoptionRequest,
    onSuccess: () => {
      toast.show({
        title: t('ADOPTION_REQUESTS.OWNER.DETAIL.DENY_SUCCESS'),
        placement: 'bottom',
        duration: 3000,
      });

      return leaveWithFreshList();
    },
    onError: (error) => {
      const wasAlreadyResolved = axios.isAxiosError(error) && error.response?.status === 409;

      toast.show({
        title: wasAlreadyResolved
          ? t('ADOPTION_REQUESTS.OWNER.DETAIL.ALREADY_RESOLVED')
          : t('ADOPTION_REQUESTS.OWNER.DETAIL.DENY_ERROR'),
        placement: 'bottom',
        duration: 3000,
      });

      // A 409 means someone already resolved this request, so the screen is
      // stale. Anything else leaves the owner here to try again.
      if (wasAlreadyResolved) return leaveWithFreshList();
    },
    retry: false,
  });

  return {
    deny: (requestId: string) => denyMutation.mutate(requestId),
    isDenying: denyMutation.isPending,
  };
};
