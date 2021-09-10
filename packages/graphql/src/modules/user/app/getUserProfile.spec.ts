import Provider from '../domain/Provider';
import User from '../domain/User';
import createFakeUsersRepository from '../infra/fakes/fakeUsersRepository';

import createGetUserProfile from './getUserProfile';

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
