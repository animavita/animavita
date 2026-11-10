export const AdoptionRequestStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DENIED: 'denied',
  CANCELLED: 'cancelled',
} as const;

export type AdoptionRequestStatusType =
  | 'pending'
  | 'accepted'
  | 'denied'
  | 'cancelled';

/**
 * Why a request was denied. Lets an adopter be told the pet found a home rather
 * than that they were personally turned down. Only set on denied requests.
 */
export const DenialReason = {
  REJECTED_BY_OWNER: 'rejected_by_owner',
  PET_ADOPTED: 'pet_adopted',
  PET_REMOVED: 'pet_removed',
} as const;

export type DenialReasonType =
  | 'rejected_by_owner'
  | 'pet_adopted'
  | 'pet_removed';

export type AdoptionRequestResponse = {
  id: string;
  petId: string;
  adopterId: string;
  status: AdoptionRequestStatusType;
  denialReason: DenialReasonType | null;
  createdAt: string;
  updatedAt: string;
  pet: {
    id: string;
    name: string;
    breed: string;
    type: string;
    owner: {
      id: string;
      name: string;
    };
  };
  adopter: {
    id: string;
    name: string;
  };
};
