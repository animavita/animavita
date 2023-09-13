import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { AdoptionType } from '@animavita/models';

export const adoptionFactory = Factory.define<AdoptionType>(({ params }) => {
  const type =
    params.type || faker.helpers.arrayElement(['cat', 'dog', 'other']);
  const breedType = type === 'other' ? faker.animal.type() : type;
  const breed = faker.animal[breedType]();
  return {
    name: params.name || faker.person.firstName(),
    gender: params.gender || faker.helpers.arrayElement(['male', 'female']),
    breed,
    type,
    age: faker.helpers.arrayElement(['puppy', 'young', 'adult', 'senior']),
    size: faker.helpers.arrayElement(['small', 'medium', 'big']),
    observations: faker.word.adjective(),
    photos: [faker.image.url()],
  };
});
