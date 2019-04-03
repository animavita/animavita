import User from '../../../models/User/user.model';

const users = async (parent, args, context, info) => {
  const user = await User.find({})
    .populate()
    .exec();
  return user;
};

export { users };
