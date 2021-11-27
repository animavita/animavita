import {Pet} from '../../domain/Pet';
import {PetsRepository} from '../../domain/PetsRepository';

const makeMockedPetsRepository = (): PetsRepository => {
  const pets: Pet.Type[] = [];

  return {
    getNextUUID(): string {
      return 'fake-uuid';
    },
    async store(pet: Pet.Type): Promise<Pet.Type> {
      const petIndex = pets.findIndex(p => p.id === pet.id);

      if (petIndex > -1) {
        pets[petIndex] = pet;
      } else {
        pets.push(pet);
      }

      return pet;
    },
  };
};

export {makeMockedPetsRepository};
