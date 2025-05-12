import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { UserType } from '@animavita/types';
import { UserEntity } from 'src/user/repositories/user-repository.interface';

export const userFactory = Factory.define<UserType>(({ params }) => {
  const name = params.name || faker.person.firstName();
  return {
    name,
    email: params.email || faker.internet.email({ firstName: name }),
    password: params.password || faker.internet.password(),
    phoneNumber: params.phoneNumber || faker.phone.number(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    photoUri: params.photoUri || faker.image.avatar(),
  };
});

export const userEntityFactory = Factory.define<UserEntity>(({ params }) => {
  const user = userFactory.build(params);
  return {
    ...user,
    id: params.id || '123',
    createdAt: params.createdAt || '',
    updatedAt: params.updatedAt || '',
  };
});
