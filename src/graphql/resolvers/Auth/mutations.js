import bcrypt from 'bcrypt';
import User from '../../../models/User/user.model';

const createToken = async (parent, { email, password }, context) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Unauthorized, wrong email or password!');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Unauthorized, wrong email or password!');
  }

  return user;
};

export { createToken };
