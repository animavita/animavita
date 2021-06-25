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
      url: 'socialId-fake-token-fake-token/profilePicture.jpeg',
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
  it('should be able to authenticate', async () => {
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
          url: 'socialId-fake-token-fake-token/profilePicture.jpeg',
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

  it('should be able to authenticate with no user photo', async () => {
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

  it('should be able to login again if a user already exists', async () => {
    const {authenticateUser, userRepository} = setUp();

    await userRepository.createUser(fakeUser);

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.id).toBe('fake-uuid');
    expect(user.emails[0].email).toBe('mysocialemail@fake.com');
  });

  it('should update name if the name has changed', async () => {
    const {authenticateUser, userRepository} = setUp();

    await userRepository.createUser({
      ...fakeUser,
      name: 'old-fake-user',
    });

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.name).toBe('fake-user');
  });

  it('should update provider id if the id has changed', async () => {
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

  it('should update profilePhoto if none was provided before', async () => {
    const {authenticateUser, userRepository} = setUp();

    await userRepository.createUser({
      ...fakeUser,
      profileImages: [],
    });

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.providersIds[0].id).toBe('socialId-fake-token');
  });

  it('should throw an error if it is not able to find the user when updated', async () => {
    const {authenticateUser, userRepository} = setUp();

    jest.spyOn(userRepository, 'findById').mockImplementationOnce(async () => {
      return null;
    });

    await userRepository.createUser(fakeUser);

    await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
  });

  it('should throw an error if no data if return from social provider', async () => {
    const {authenticateUser, facebookRepository} = setUp();

    jest.spyOn(facebookRepository, 'getUser').mockImplementationOnce(async () => {
      return null;
    });

    await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
  });
});
