import { AdoptionRequestDto } from '../dto/adoption-request.dto';

export const ADOPTION_REQUEST_DAO = 'ADOPTION_REQUEST_DAO';

/**
 * A request as stored, with both phone numbers always present. It is
 * deliberately not assignable to `AdoptionRequestDto`: whether a caller may see
 * the numbers is a domain rule, so a record has to go through
 * `toAdoptionRequestDto` before it leaves the application layer.
 */
export type AdoptionRequestRecord = Omit<
  AdoptionRequestDto,
  'pet' | 'adopter'
> & {
  pet: Omit<AdoptionRequestDto['pet'], 'owner'> & {
    owner: Omit<AdoptionRequestDto['pet']['owner'], 'phoneNumber'>;
  };
  adopter: Omit<AdoptionRequestDto['adopter'], 'phoneNumber'>;
  ownerPhoneNumber: string | null;
  adopterPhoneNumber: string | null;
};

export interface AdoptionRequestDao {
  getByAdopter(adopterId: string): Promise<AdoptionRequestRecord[]>;
  getByOwner(ownerId: string): Promise<AdoptionRequestRecord[]>;
  getRequestedPetIds(adopterId: string): Promise<string[]>;
}
