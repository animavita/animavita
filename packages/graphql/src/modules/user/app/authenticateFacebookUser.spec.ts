import StorageProvider from '../../../common/providers/StorageProvider/models/StorageProvider';
import User from '../domain/User';
import UsersRepository from '../domain/UsersRepository';
import SocialMediaRepository from '../domain/SocialMediaRepository';
import FakeStorageProvider from '../../../common/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../infra/fakes/FakeUsersRepository';
import FakeFacebookRepository from '../infra/fakes/FakeFacebookRepository';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

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

let authenticateUser: ReturnType<typeof authenticateFacebookUser>;
let storageProvider: StorageProvider;
let userRepository: UsersRepository;
let facebookRepository: SocialMediaRepository;
let tokenProvider: FakeTokenProvider;

describe('AuthenticateFacebookUser', () => {
  beforeEach(() => {
    storageProvider = new FakeStorageProvider();
    userRepository = new FakeUsersRepository();
    facebookRepository = new FakeFacebookRepository();
    tokenProvider = new FakeTokenProvider(userRepository);

    authenticateUser = authenticateFacebookUser({
      facebookRepository,
      storageProvider,
      tokenProvider,
      userRepository,
    });
  });

  it('should be able to authenticate', async () => {
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
    await userRepository.createUser(fakeUser);

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.id).toBe('fake-uuid');
    expect(user.emails[0].email).toBe('mysocialemail@fake.com');
  });

  it('should update name if the name has changed', async () => {
    await userRepository.createUser({
      ...fakeUser,
      name: 'old-fake-user',
    });

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.name).toBe('fake-user');
  });

  it('should update provider id if the id has changed', async () => {
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
    await userRepository.createUser({
      ...fakeUser,
      profileImages: [],
    });

    const {user} = await authenticateUser(authenticateUserParams);

    expect(user.providersIds[0].id).toBe('socialId-fake-token');
  });

  it('should throw an error if it is not able to find the user when updated', async () => {
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(async () => {
      return null;
    });

    await userRepository.createUser(fakeUser);

    await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
  });

  it('should throw an error if no data if return from social provider', async () => {
    jest.spyOn(facebookRepository, 'getUser').mockImplementationOnce(async () => {
      return null;
    });

    await expect(authenticateUser(authenticateUserParams)).rejects.toBeInstanceOf(Error);
  });
});
