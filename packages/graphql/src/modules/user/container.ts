import {asFunction, AwilixContainer} from 'awilix';

import authenticateFacebookUser from './app/authenticateFacebookUser';
import SocialMediaRepository from './domain/SocialMediaRepository';
import UsersRepository from './domain/UsersRepository';
import facebookSocialMediaRepository from './infra/facebookSocialMediaRepository';
import mongoUsersRepository from './infra/mongoose/repositories/mongoUsersRepository';
import jwtTokenProvider from './providers/TokenProvider/implementations/jwtTokenProvider';
import TokenProvider from './providers/TokenProvider/model/TokenProvider';

export type Container = {
  userRepository: UsersRepository;
  facebookRepository: SocialMediaRepository;
  tokenProvider: TokenProvider;
  authenticateFacebookUser: ReturnType<typeof authenticateFacebookUser>;
};

export const register = (container: AwilixContainer) =>
  container.register({
    userRepository: asFunction(mongoUsersRepository).singleton(),
    facebookRepository: asFunction(facebookSocialMediaRepository).singleton(),
    tokenProvider: asFunction(jwtTokenProvider).singleton(),
    authenticateFacebookUser: asFunction(authenticateFacebookUser),
  });
