import { faker } from '@faker-js/faker';
import { Pet } from './pet';

const attributes = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  breed: faker.animal.dog(),
  age: 'adult',
  type: 'cat',
  gender: 'male',
  size: 'medium',
  observations: faker.lorem.sentence(),
  photos: [],
  ownerId: faker.string.uuid(),
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  },
};

describe('Pet', () => {
  describe('update', () => {
    it('updates pet name', () => {
      const pet = Pet.create(attributes);

      pet.update({
        name: 'Mike',
        age: 'young',
        breed: 'shitzu',
        gender: 'female',
        observations: 'very friendly',
        photos: ['s3://1.jpg', 's3://2.jpg'],
        size: 'small',
        type: 'dog',
      });

      expect(pet.name).toBe('Mike');
      expect(pet.age).toBe('young');
      expect(pet.breed).toBe('shitzu');
      expect(pet.gender).toBe('female');
      expect(pet.observations).toBe('very friendly');
      expect(pet.photos).toEqual(['s3://1.jpg', 's3://2.jpg']);
      expect(pet.size).toBe('small');
      expect(pet.type).toBe('dog');
    });
  });
});
