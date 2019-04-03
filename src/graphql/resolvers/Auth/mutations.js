import bcrypt from 'bcrypt';
import User from '../../../models/User/user.model';
import { generateToken } from '../../../utils/auth';

const createToken = async (parent, { email, password }, context) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Unauthorized, wrong email or password!');
  }

  const token = generateToken({ id: user.id });

  return {
    user,
    token
  };
};

export { createToken };
