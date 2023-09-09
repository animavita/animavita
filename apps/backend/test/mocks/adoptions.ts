import { AdoptionType, UserType } from '@animavita/types';

export const pet1Mock: AdoptionType = {
  name: 'Bob',
  age: 'puppy',
  type: 'dog',
  breed: 'Rottweiler',
  gender: 'male',
  observations: '',
  photos: [],
  size: 'big',
};

export const pet2Mock: AdoptionType = {
  name: 'Max',
  age: 'young',
  type: 'cat',
  breed: 'Birman',
  gender: 'male',
  observations: '',
  photos: [],
  size: 'medium',
};

export const pet3Mock: AdoptionType = {
  name: 'Lucy',
  age: 'adult',
  type: 'dog',
  breed: 'Bulldog',
  gender: 'female',
  observations: '',
  photos: [],
  size: 'small',
};

export const user1Mock: UserType = {
  email: 'john@email.com',
  location: {
    longitude: -47.58849,
    latitude: -20.90038,
  },
  name: 'John',
  password: 'NicePass123@',
};

export const user2Mock: UserType = {
  email: 'paul@email.com',
  location: {
    longitude: -47.58839,
    latitude: -20.9064,
  },
  name: 'Paul',
  password: 'NicePass123@',
};

export const countrymen = [user1Mock, user2Mock];

export const petsMock = [pet1Mock, pet2Mock, pet3Mock];
