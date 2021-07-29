import User from '../domain/User';
import UsersRepository from '../domain/UsersRepository';

interface Dependencies {
  userRepository: UsersRepository;
}

const getUserProfile = ({userRepository}: Dependencies) => async (id: string): Promise<User> => {
  const user = await userRepository.findById(id);

  if (!user) throw Error('User not found');

  return user;
};

export default getUserProfile;
