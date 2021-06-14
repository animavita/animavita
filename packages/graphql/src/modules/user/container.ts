import {asClass, asFunction, AwilixContainer} from 'awilix';

import authenticateFacebookUser from './app/authenticateFacebookUser';
import SocialMediaRepository from './domain/SocialMediaRepository';
import UsersRepository from './domain/UsersRepository';
import FacebookRepository from './infra/FacebookRepository';
import MongoUsersRepository from './infra/mongoose/repositories/MongoUsersRepository';
import JwtTokenProvider from './providers/TokenProvider/implementations/JwtTokenProvider';
import TokenProvider from './providers/TokenProvider/model/TokenProvider';

export type Container = {
  userRepository: UsersRepository;
  facebookRepository: SocialMediaRepository;
  tokenProvider: TokenProvider;
  authenticateFacebookUser: ReturnType<typeof authenticateFacebookUser>;
};

export const register = (container: AwilixContainer) =>
  container.register({
    userRepository: asClass(MongoUsersRepository).singleton(),
    facebookRepository: asClass(FacebookRepository).singleton(),
    tokenProvider: asClass(JwtTokenProvider).singleton(),
    authenticateFacebookUser: asFunction(authenticateFacebookUser),
  });
