import { AdoptionType } from '@animavita/models';

export const pet1Mock: AdoptionType = {
  name: 'Bob',
  age: 4,
  type: 'dog',
  breed: 'Rottweiler',
  gender: 'male',
  observations: '',
  photos: [],
  size: 'big',
};

export const pet2Mock: AdoptionType = {
  name: 'Max',
  age: 2,
  type: 'cat',
  breed: 'Birman',
  gender: 'male',
  observations: '',
  photos: [],
  size: 'medium',
};

export const pet3Mock: AdoptionType = {
  name: 'Lucy',
  age: 1,
  type: 'dog',
  breed: 'Bulldog',
  gender: 'female',
  observations: '',
  photos: [],
  size: 'small',
};

export const petsMock = [pet1Mock, pet2Mock, pet3Mock];
