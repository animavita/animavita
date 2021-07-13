import User from '../domain/User';
import createFakeStorageProvider from '../../../shared/providers/StorageProvider/fakes/fakeStorageProvider';
import createFakeUsersRepository from '../infra/fakes/fakeUsersRepository';
import createFakeSocialMediaRepository from '../infra/fakes/fakeSocialMediaRepository';
import createFakeTokenProvider from '../providers/TokenProvider/fakes/fakeTokenProvider';

import authenticateFacebookUser from './authenticateFacebookUser';

const authenticateUserParams = {
  token: 'fake-token',
  permissions: ['public_profile', 'email'],
  expires: 60 * 60 * 24 * 30,
};

const fakeUser = new User({
  id: 'fake-uuid',
  name: 'fake-user',
  emails: [
    {
      email: 'mysocialemail@fake.com',
      providedBy: 'facebook',
    },
  ],
  profileImages: [
    {
      providedBy: 'facebook',
      url: 'fake-token/profilePicture.jpeg',
    },
  ],
  providersIds: [
    {
      id: 'socialId-fake-token',
      providedBy: 'facebook',
    },
  ],
});

const setUp = () => {
  const userRepository = createFakeUsersRepository();
  const storageProvider = createFakeStorageProvider();
  const facebookRepository = createFakeSocialMediaRepository();
  const tokenProvider = createFakeTokenProvider({userRepository});
  const authenticateUser = authenticateFacebookUser({
    facebookRepository,
    storageProvider,
    tokenProvider,
    userRepository,
  });

  return {
    authenticateUser,
    storageProvider,
    userRepository,
    facebookRepository,
    tokenProvider,
  };
};

describe('AuthenticateFacebookUser', () => {
  describe('When logging in for the first time', () => {
    it('authenticates', async () => {
      const {authenticateUser} = setUp();

      const {user, token} = await authenticateUser(authenticateUserParams);

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual({
        id: 'fake-uuid',
        name: 'fake-user',
        emails: [
          {
            email: 'mysocialemail@fake.com',
            providedBy: 'facebook',
          },
        ],
        profileImages: [
          {
            providedBy: 'facebook',
            url: 'fake-token/profilePicture.jpeg',
          },
        ],
        providersIds: [
          {
            id: 'socialId-fake-token',
            providedBy: 'facebook',
          },
        ],
      });
      expect(token).toMatch(/(JWT )\w+\.\w+\.\w+/g);
    });

    it('authenticates even with no user photo is provided', async () => {
      const {facebookRepository, authenticateUser} = setUp();

      jest.spyOn(facebookRepository, 'getUserProfileImage').mockImplementationOnce(async () => {
        return null;
      });

      const {user, token} = await authenticateUser(authenticateUserParams);

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual({
        id: 'fake-uuid',
        name: 'fake-user',
        emails: [
          {
            email: 'mysocialemail@fake.com',
            providedBy: 'facebook',
          },
        ],
        profileImages: [],
        providersIds: [
          {
            id: 'socialId-fake-token',
            providedBy: 'facebook',
          },
        ],
      });
      expect(token).toMatch(/(JWT )\w+\.\w+\.\w+/g);
    });
  });

  describe('When logging in again with an already existing user', () => {
    it('authenticates', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.createUser(fakeUser);

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user.id).toBe('fake-uuid');
      expect(user.emails[0].email).toBe('mysocialemail@fake.com');
    });

    it('updates name if the name has changed', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.createUser({
        ...fakeUser,
        name: 'old-fake-user',
      });

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user.name).toBe('fake-user');
    });

    it('updates provider id if the id has changed', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.createUser({
        ...fakeUser,
        providersIds: [
          {
            id: 'old-socialId-fake-token',
            providedBy: 'facebook',
          },
        ],
      });

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user.providersIds[0].id).toBe('socialId-fake-token');
    });

    it('updates profilePhoto if none was provided before', async () => {
      const {authenticateUser, userRepository} = setUp();

      await userRepository.createUser({
        ...fakeUser,
        profileImages: [],
      });

      const {user} = await authenticateUser(authenticateUserParams);

      expect(user.providersIds[0].id).toBe('socialId-fake-token');
    });

    it('throws an error if it is not able to find the user when updated', async () => {
      const {authenticateUser, userRepository} = setUp();

      jest.spyOn(userRepository, 'findById').mockImplementationOnce(async () => {
        return null;
      });

      await userRepository.createUser(fakeUser);

      await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
    });
  });

  describe('When the social provider does not return any data', () => {
    it('throws an error', async () => {
      const {authenticateUser, facebookRepository} = setUp();

      jest.spyOn(facebookRepository, 'getUser').mockImplementationOnce(async () => {
        return null;
      });

      await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
    });
  });
});
