import {AssertionError} from 'assert';

import {Pet} from '../domain/Pet';
import {makeMockedPetsRepository} from '../infra/mocks/mockedPetsRepository';

import {registerPet} from './registerPet';

const fakePet: Omit<Pet.Type, 'id'> = {
  name: 'Amendoim',
  gender: 'male',
  location: {
    type: 'Point',
    coordinates: [-74.123, 73.091],
  },
  photos: ['photo1', 'photo2'],
  specie: 'dog',
  age: 1,
  description: 'Cutest dog ever',
};

const setUp = () => {
  const petsRepository = makeMockedPetsRepository();

  const register = registerPet({
    petsRepository,
  });

  return {
    register,
  };
};

describe('RegisterPet', () => {
  describe('when pet has all the needed information', () => {
    it('registers', async () => {
      const {register} = setUp();

      const registeredPet = await register(fakePet);

      expect(registeredPet).toHaveProperty('id');
      expect(registeredPet.photos).toHaveLength(2);
    });
  });

  describe('when pet does not have all the need information', () => {
    it("throws an error if pet's names is shorter than 3 letters", async () => {
      const {register} = setUp();

      await expect(register({...fakePet, name: 'bo'})).rejects.toBeInstanceOf(AssertionError);
    });
    it("throws an error if no pet's photos is provided", async () => {
      const {register} = setUp();

      await expect(register({...fakePet, photos: []})).rejects.toBeInstanceOf(AssertionError);
    });
  });
});
