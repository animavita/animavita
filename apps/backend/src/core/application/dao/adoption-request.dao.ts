import { AdoptionRequestDto } from '../dto/adoption-request.dto';

export const ADOPTION_REQUEST_DAO = 'ADOPTION_REQUEST_DAO';

export interface AdoptionRequestDao {
  getByAdopter(adopterId: string): Promise<AdoptionRequestDto[]>;
  getByOwner(ownerId: string): Promise<AdoptionRequestDto[]>;
}
