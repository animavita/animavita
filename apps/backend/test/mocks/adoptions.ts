import { AdoptionType, UserType } from '@animavita/types';

export const pet1Mock = adoptionFactory.build();
export const pet2Mock = adoptionFactory.build();
export const pet3Mock = adoptionFactory.build();

export const user1Mock = userFactory.build({ name: 'John' });
export const user2Mock = userFactory.build({ name: 'Paul' });

export const countrymen = [user1Mock, user2Mock];

export const petsMock = [pet1Mock, pet2Mock, pet3Mock];
