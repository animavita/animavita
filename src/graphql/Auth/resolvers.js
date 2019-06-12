import bcrypt from 'bcrypt';
import User from '~/models/User';
import { generateToken } from '~/utils/auth';

export default {
  Query: {
    me: async (parent, args, context) => context.user
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Unauthorized, wrong email or password!');
      }

      const token = generateToken({ id: user.id });

      return {
        token,
        user
      };
    },
    register: async (parent, { input }) => {
      try {
        const user = await User.create(input);
        const token = generateToken({ id: user.id });
        return { user, token };
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
