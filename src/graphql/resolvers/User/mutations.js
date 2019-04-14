import User from '../../../models/user.model';

export const createUser = async (parent, { input }) => {
  try {
    const user = await User.create(input);
    return { user };
  } catch (err) {
    throw new Error(err);
  }
};
