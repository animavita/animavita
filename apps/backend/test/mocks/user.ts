import { UserEntity } from 'src/user/repositories/user-repository.interface';
import { userEntityFactory, userFactory } from '../factories/user';

export const createUserMock = userFactory.build({
  name: 'Grosbilda',
  email: 'grosbilda@email.com',
  phoneNumber: '+5551234567890',
});

export const userMock: UserEntity = userEntityFactory.build({
  ...createUserMock,
  id: '123',
  createdAt: '',
  updatedAt: '',
});
