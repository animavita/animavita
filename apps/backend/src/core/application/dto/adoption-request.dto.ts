export type AdoptionRequestDto = {
  id: string;
  petId: string;
  adopterId: string;
  status: 'pending' | 'accepted' | 'denied' | 'cancelled';
  denialReason: 'rejected_by_owner' | 'pet_adopted' | 'pet_removed' | null;
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
