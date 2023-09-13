import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

import { UserType } from '@animavita/models';

export const userFactory = Factory.define<UserType>(({ params }) => {
  const name = params.name || faker.person.firstName();
  return {
    name,
    email: params.email || faker.internet.email({ firstName: name }),
    password: params.password || faker.internet.password(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    photoUri: params.photoUri || faker.internet.avatar(),
  };
});
