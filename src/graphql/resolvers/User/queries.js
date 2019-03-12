import User from "../../../models/User";

const users = async (parent, args, context, info) => {
  return await User.find({})
    .populate()
    .exec();
};

export { users };
