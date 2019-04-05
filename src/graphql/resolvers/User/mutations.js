import User from '../../../models/User/user.model';

export const createUser = async (parent, { input }, context, info) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
