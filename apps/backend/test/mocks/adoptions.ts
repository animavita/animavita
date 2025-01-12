import { userEntityFactory } from '../factories/user';
import { adoptionFactory } from '../factories/adoption';

export const pet1Mock = adoptionFactory.build();
export const pet2Mock = adoptionFactory.build();
export const pet3Mock = adoptionFactory.build();

export const user1Mock = userEntityFactory.build({
  name: 'John',
  email: 'john@email.com',
  location: {
    longitude: -47.58849,
    latitude: -20.90038,
  },
});
export const user2Mock = userEntityFactory.build({
  name: 'Paul',
  location: {
    longitude: -47.58839,
    latitude: -20.9064,
  },
});

export const petsMock = [pet1Mock, pet2Mock, pet3Mock];
