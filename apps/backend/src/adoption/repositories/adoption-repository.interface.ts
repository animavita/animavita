import {
  AnimalAgesType,
  AnimalGendersType,
  AnimalSizesType,
  AnimalType,
} from '@animavita/types';
import { UserEntity } from '../../user/repositories/user-repository.interface';
import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';

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

export abstract class AdoptionRepository extends GenericRepository<
  AdoptionEntity,
  PopulatedAdoptionEntity
> {}
