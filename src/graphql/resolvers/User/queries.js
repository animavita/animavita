import User from '../../../models/user.model';

export const users = async (parent, args, context, info) => {
  const allUsers = await User.find({});
  return allUsers;
};
