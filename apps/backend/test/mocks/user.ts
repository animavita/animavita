import { UserEntity } from 'src/user/repositories/user-repository.interface';

export const userMock: UserEntity = {
  name: 'Grosbilda',
  email: 'grosbilda@email.com',
  password: 'quesenharuimgrosbilda',
  location: {
    latitude: 10.002322,
    longitude: -40.343569,
  },
  photoUri: 'http://www.google.com/',
  id: '123',
  createdAt: '',
  updatedAt: '',
};
