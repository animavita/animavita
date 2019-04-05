import User from '../../../models/User/user.model';

export const users = async (parent, args, context, info) => {
  const user = await User.find({});
  return user;
};
