export type AdoptionRequestStatusType = 'pending' | 'accepted' | 'denied';

export type AdoptionRequestResponse = {
  id: string;
  petId: string;
  adopterId: string;
  status: AdoptionRequestStatusType;
  createdAt: string;
  updatedAt: string;
};
