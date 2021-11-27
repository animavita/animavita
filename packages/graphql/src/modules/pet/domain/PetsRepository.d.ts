import {Pet} from './Pet';

interface PetsRepository {
  store(data: Pet): Pet;
  getNextUUID(): string;
}

export {PetsRepository};
