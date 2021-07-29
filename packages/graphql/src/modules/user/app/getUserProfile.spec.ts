import User from '../domain/User';
import createFakeUsersRepository from '../infra/fakes/fakeUsersRepository';

import createGetUserProfile from './getUserProfile';

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
  const getUserProfile = createGetUserProfile({
    userRepository,
  });

  return {
    getUserProfile,
    userRepository,
  };
};

describe('GetUserProfile', () => {
  describe('When user exits', () => {
    it('returns the user', async () => {
      const {getUserProfile, userRepository} = setUp();

      const {id} = await userRepository.create(fakeUser);

      const user = await getUserProfile(id);

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual(fakeUser);
    });
  });

  describe('When user does not exit', () => {
    it('returns an error', async () => {
      const {getUserProfile} = setUp();

      await expect(getUserProfile('nonexistent-id')).rejects.toBeInstanceOf(Error);
    });
  });
});
