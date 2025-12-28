import { AdoptionRequestResponse } from '@animavita/types';
import React from 'react';

import { useAuth } from '@/hooks/use-auth-provider';
import { AdoptionRequestDetail as AdopterDetail } from '@/screens/adopter/adoption-request-detail/adoption-request-detail';
import { AdoptionRequestDetail as OwnerDetail } from '@/screens/owner/adoption-request-detail/adoption-request-detail';

type AdoptionRequestDetailProps = {
  route: {
    params: {
      request: AdoptionRequestResponse;
    };
  };
};

export const AdoptionRequestDetail = ({ route }: AdoptionRequestDetailProps) => {
  const auth = useAuth();
  const isOwner = auth.user?.role === 'owner';

  if (isOwner) {
    return <OwnerDetail route={route} />;
  }

  return <AdopterDetail route={route} />;
};
