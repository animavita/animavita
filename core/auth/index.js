import jwt from 'jsonwebtoken';
import User from '~/models/User';

require('dotenv').config();

const { APP_SECRET } = process.env;

export const generateToken = payload => jwt.sign(payload, APP_SECRET, {
  expiresIn: 86400
});

export const getUser = async (token) => {
  if (!token) return { user: null };
  try {
    const decodedToken = jwt.verify(token.substring(7), APP_SECRET);
    const user = await User.findOne({ _id: decodedToken.id });

    return {
      user
    };
  } catch (err) {
    return { user: null };
  }
};
