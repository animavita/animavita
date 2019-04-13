import User from '../../../models/User/user.model';
import { generateToken } from '../../../utils/auth';

export const createUser = async (parent, { input }) => {
  try {
    const user = await User.create(input);
    const token = generateToken({ id: user.id });
    return { user, token };
  } catch (err) {
    throw new Error(err);
  }
};
