import User from '~/models/User';

export default {
  Query: {
    users: async () => {
      const allUsers = await User.find({});
      return allUsers;
    }
  },
  Mutation: {
    createUser: async (parent, { input }) => {
      try {
        const user = await User.create(input);
        return { user };
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
