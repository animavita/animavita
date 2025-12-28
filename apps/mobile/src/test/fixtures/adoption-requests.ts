import { AdoptionRequestResponse, AdoptionRequestStatus } from '@/services/adoptions';

export const mockAdoptionRequests: AdoptionRequestResponse[] = [
  {
    id: '1',
    petId: 'pet1',
    adopterId: 'adopter1',
    status: AdoptionRequestStatus.PENDING,
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
