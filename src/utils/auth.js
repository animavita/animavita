import jwt from 'jsonwebtoken';
import User from '../models/user.model';

require('dotenv').config();

const { APP_SECRET, TOKEN_TIME } = process.env;

export const generateToken = payload => jwt.sign(payload, APP_SECRET, {
  expiresIn: TOKEN_TIME
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
    console.log(err);
    return { user: null };
  }
};
