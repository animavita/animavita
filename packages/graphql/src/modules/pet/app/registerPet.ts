import {Pet} from '../domain/Pet';
import {PetsRepository} from '../domain/PetsRepository';

interface Dependencies {
  petsRepository: PetsRepository;
}

type RegisterPetDTO = Omit<Pet.Type, 'id'>;

const registerPet = ({petsRepository}: Dependencies) => async (data: RegisterPetDTO): Promise<Pet.Type> => {
  const pet = Pet.create({
    id: petsRepository.getNextUUID(),
    name: data.name,
    gender: data.gender,
    photos: data.photos,
    specie: data.specie,
    age: data.age,
    description: data.description,
    location: data.location,
    size: data.size,
  });

  await petsRepository.store(pet);

  return pet;
};

export {registerPet, RegisterPetDTO};
