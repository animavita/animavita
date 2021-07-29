import {asFunction, AwilixContainer} from 'awilix';

import authenticateFacebookUser from './app/authenticateFacebookUser';
import getUserProfile from './app/getUserProfile';
import SocialMediaRepository from './domain/SocialMediaRepository';
import UsersRepository from './domain/UsersRepository';
import facebookSocialMediaRepository from './infra/facebookSocialMediaRepository';
import mongoUsersRepository from './infra/mongoose/repositories/mongoUsersRepository';
import jwtTokenProvider from './providers/TokenProvider/implementations/jwtTokenProvider';
import TokenProvider from './providers/TokenProvider/model/TokenProvider';

export type Container = {
  authenticateFacebookUser: ReturnType<typeof authenticateFacebookUser>;
  facebookRepository: SocialMediaRepository;
  getUserProfile: ReturnType<typeof getUserProfile>;
  tokenProvider: TokenProvider;
  userRepository: UsersRepository;
};

export const register = (container: AwilixContainer) =>
  container.register({
    authenticateFacebookUser: asFunction(authenticateFacebookUser),
    facebookRepository: asFunction(facebookSocialMediaRepository).singleton(),
    getUserProfile: asFunction(getUserProfile),
    tokenProvider: asFunction(jwtTokenProvider).singleton(),
    userRepository: asFunction(mongoUsersRepository).singleton(),
  });
