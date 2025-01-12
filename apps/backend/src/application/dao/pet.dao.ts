import { NearPet } from '../dto/near-pet.dto';

export interface PetDao {
  findNearest(): Promise<NearPet[]>;
}
