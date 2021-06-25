import jwt from 'jsonwebtoken';

import UsersRepository from '../../../domain/UsersRepository';
import {JWT_KEY} from '../../../../../shared/config';
import TokenProvider from '../model/TokenProvider';

interface Dependencies {
  userRepository: UsersRepository;
}

export default function jwtTokenProvider({userRepository}: Dependencies): TokenProvider {
  return {
    generateToken(userId: string) {
      return `JWT ${jwt.sign({id: userId}, JWT_KEY)}`;
    },

    async getUser(token: string) {
      if (!token) return null;

      try {
        const decodedToken = jwt.verify(token.substring(4), JWT_KEY);

        const user = await userRepository.findById((decodedToken as {id: string}).id);

        if (!user) return null;

        return user;
      } catch (err) {
        return null;
      }
    },
  };
}
