export const AdoptionRequestStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DENIED: 'denied',
} as const;

export type AdoptionRequestStatusType = 'pending' | 'accepted' | 'denied';

export type AdoptionRequestResponse = {
  id: string;
  petId: string;
  adopterId: string;
  status: AdoptionRequestStatusType;
  createdAt: string;
  updatedAt: string;
  pet: {
    id: string;
    name: string;
    breed: string;
    type: string;
  };
  adopter: {
    id: string;
    name: string;
  };
};
