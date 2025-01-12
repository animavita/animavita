import { NearPet } from '../dto/near-pet.dto';

export const PET_DAO = 'PET_DAO';

interface FindNearestInput {
  radius: number;
  adopterId: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

export interface PetDao {
  findNearest(input: FindNearestInput): Promise<NearPet[]>;
}
