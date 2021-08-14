import User from '../domain/User';
import createFakeStorageProvider from '../../../shared/providers/StorageProvider/fakes/fakeStorageProvider';
import createFakeUsersRepository from '../infra/fakes/fakeUsersRepository';
import createFakeSocialMediaService from '../infra/fakes/fakeSocialMediaService';
import createFakeTokenProvider from '../providers/TokenProvider/fakes/fakeTokenProvider';
import Provider from '../domain/Provider';

import authenticateFacebookUser from './authenticateFacebookUser';

const JwtRegex = /^(JWT )[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/g;
const authenticateUserParams = {
  token: 'fake-token',
  permissions: ['public_profile', 'email'],
  expires: 60 * 60 * 24 * 30,
};

const facebookProvider = Provider.create({
  id: 'socialId-fake-token',
  email: 'mysocialemail@fake.com',
  name: 'fake-user',
  origin: 'facebook',
  profileImage: 'fake-token/profilePicture.jpeg',
  lastLogIn: 0,
});

const fakeUser = User.create({
  id: 'fake-uuid',
  providers: [facebookProvider],
});

const setUp = () => {
  const userRepository = createFakeUsersRepository();
  const storageProvider = createFakeStorageProvider();
  const facebookService = createFakeSocialMediaService();
  const tokenProvider = createFakeTokenProvider({userRepository});
  const authenticateUser = authenticateFacebookUser({
    facebookService,
    tokenProvider,
    userRepository,
  });

  return {
    authenticateUser,
    storageProvider,
    userRepository,
    facebookService,
    tokenProvider,
  };
};

describe('AuthenticateFacebookUser', () => {
  describe('When logging in for the first time', () => {
    it('authenticates', async () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 0);
      const {authenticateUser} = setUp();

      const {user, token} = await authenticateUser(authenticateUserParams);

      expect(user).toEqual(fakeUser);
      expect(token).toMatch(JwtRegex);
    });

    it('authenticates even with no user photo is provided', async () => {
      const {facebookService, authenticateUser} = setUp();

      jest.spyOn(facebookService, 'getUserProfileImage').mockImplementationOnce(async () => {
        return undefined;
      });

      const {user, token} = await authenticateUser(authenticateUserParams);

      expect(user).toEqual({
        id: 'fake-uuid',
        providers: [{...facebookProvider, profileImage: undefined}],
      });
      expect(token).toMatch(JwtRegex);
    });
  });

  describe('When logging in again with an already existing user', () => {
    it('authenticates', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.create(fakeUser);

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user.id).toBe('fake-uuid');
      expect(user.providers[0].email).toBe('mysocialemail@fake.com');
    });

    it('updates provider with some change occurred', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.create({
        ...fakeUser,
        providers: [{...facebookProvider, name: 'old-name'}],
      });

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user).toEqual(fakeUser);
    });
  });

  describe('When the social provider does not return any data', () => {
    it('throws an error', async () => {
      const {authenticateUser, facebookService} = setUp();

      jest.spyOn(facebookService, 'getUser').mockImplementationOnce(async () => {
        return null;
      });

      await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
    });
  });
});
