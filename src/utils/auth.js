import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

require('dotenv').config();

const { APP_SECRET, TOKEN_TIME } = process.env;

export const generateToken = payload => jwt.sign(payload, APP_SECRET, {
  expiresIn: TOKEN_TIME
});

export const getAuth = request => ({
  _id: '1',
  name: 'Wendel Freitas'
});
