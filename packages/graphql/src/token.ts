import jwt from 'jsonwebtoken';

import {JWT_KEY} from './common/config';
import User, {IUserDocument} from './modules/user/UserModel';

export function generateToken(user: IUserDocument) {
  return `JWT ${jwt.sign({id: user._id}, JWT_KEY)}`;
}

export async function getUser(token: string) {
  if (!token) return null;

  try {
    const decodedToken = jwt.verify(token.substring(4), JWT_KEY);

    const user = await User.findOne({_id: (decodedToken as {id: string}).id});

    if (!user) return null;

    return user;
  } catch (err) {
    return null;
  }
}
