import {
  AnimalAgesType,
  AnimalGendersType,
  AnimalSizesType,
  AnimalType,
} from '@animavita/types';
import { UserEntity } from '../../user/repositories/user-repository.interface';

export class AdoptionEntity {
  id: string;
  name: string;
  gender: AnimalGendersType;
  breed: string;
  type: AnimalType;
  age: AnimalAgesType;
  size: AnimalSizesType;
  observations: string;
  photos: string[];
  user: UserEntity['id'];
  location: UserEntity['location'];
  createdAt: string;
  updatedAt: string;

  constructor(partial: Partial<AdoptionEntity>) {
    Object.assign(this, partial);
  }
}

export type PopulatedAdoptionEntity = Omit<AdoptionEntity, 'user'> & {
  user: Pick<UserEntity, 'id' | 'name'>;
};

export type FindNearestType = {
  radius: number;
  currentUserId: UserEntity['id'];
  coordinates: AdoptionEntity['location'];
};

export interface AdoptionRepository {
  create: (
    adoption: Omit<AdoptionEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<PopulatedAdoptionEntity>;
  update: (
    adoption: Partial<Omit<AdoptionEntity, 'createdAt' | 'updateAt'>>,
  ) => Promise<PopulatedAdoptionEntity>;
  findAll: () => Promise<PopulatedAdoptionEntity[]>;
  findNearest: (args: FindNearestType) => Promise<PopulatedAdoptionEntity[]>;
  getById: (id: string) => Promise<PopulatedAdoptionEntity>;
  delete: (id: string) => Promise<PopulatedAdoptionEntity>;
}
