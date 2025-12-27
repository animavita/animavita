import { AdoptionRequest } from '../../domain/adoption-request/adoption-request';

export const ADOPTION_REQUEST_REPOSITORY = 'ADOPTION_REQUEST_REPOSITORY';

export default interface AdoptionRequestRepository {
  getById(id: string): Promise<AdoptionRequest>;
  getByPetAndAdopter(
    petId: string,
    adopterId: string,
  ): Promise<AdoptionRequest | null>;
  store(request: AdoptionRequest): Promise<{ id: string }>;
}
