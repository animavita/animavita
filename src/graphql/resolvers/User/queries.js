import User from '../../../models/User';

const users = async (parent, args, context, info) => {
  const user = await User.find({})
    .populate()
    .exec();
  return user;
};

export { users };
