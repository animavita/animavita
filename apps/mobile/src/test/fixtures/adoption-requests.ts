import { DenialReason } from '@animavita/types';

import { AdoptionRequestResponse, AdoptionRequestStatus } from '@/services/adoptions';

export const mockAdoptionRequests: AdoptionRequestResponse[] = [
  {
    id: '1',
    petId: 'pet1',
    adopterId: 'adopter1',
    status: AdoptionRequestStatus.PENDING,
    denialReason: null,
    pet: {
      id: 'pet1',
      name: 'Rex',
      breed: 'Labrador',
      type: 'dog',
      owner: {
        id: 'owner1',
        name: 'Maria Silva',
      },
    },
    adopter: {
      id: 'adopter1',
      name: 'John Doe',
    },
    createdAt: '2024-12-31T00:00:00.000Z',
    updatedAt: '2024-12-31T00:00:00.000Z',
  },
  {
    id: '2',
    petId: 'pet2',
    adopterId: 'adopter2',
    status: AdoptionRequestStatus.ACCEPTED,
    denialReason: null,
    pet: {
      id: 'pet2',
      name: 'Mittens',
      breed: 'Persian',
      type: 'cat',
      owner: {
        id: 'owner2',
        name: 'Carlos Santos',
      },
    },
    adopter: {
      id: 'adopter2',
      name: 'Jane Smith',
    },
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    petId: 'pet3',
    adopterId: 'adopter3',
    status: AdoptionRequestStatus.DENIED,
    denialReason: DenialReason.REJECTED_BY_OWNER,
    pet: {
      id: 'pet3',
      name: 'Buddy',
      breed: 'Golden Retriever',
      type: 'dog',
      owner: {
        id: 'owner3',
        name: 'Ana Costa',
      },
    },
    adopter: {
      id: 'adopter3',
      name: 'Bob Johnson',
    },
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
];

/**
 * A request closed by the accept cascade rather than by the owner turning this
 * adopter down. Kept out of `mockAdoptionRequests` so tests that assert on the
 * default list stay unambiguous.
 */
export const mockCascadeDeniedRequest: AdoptionRequestResponse = {
  ...mockAdoptionRequests[2],
  id: '4',
  petId: 'pet4',
  denialReason: DenialReason.PET_ADOPTED,
  pet: {
    ...mockAdoptionRequests[2].pet,
    id: 'pet4',
    name: 'Luna',
    breed: 'Siamese',
    type: 'cat',
  },
};
