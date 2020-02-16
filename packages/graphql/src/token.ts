import jwt from 'jsonwebtoken';

import {JWT_KEY} from './common/config';

import {IUserDocument} from './modules/user/UserModel';

export function generateToken(user: IUserDocument) {
  return `JWT ${jwt.sign({id: user._id}, JWT_KEY)}`;
}
