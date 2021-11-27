import {asFunction, AwilixContainer} from 'awilix';

import authenticateFacebookUser from './app/authenticateFacebookUser';
import getUserProfile from './app/getUserProfile';
import SocialMediaService from './services/SocialMediaService';
import UsersRepository from './domain/UsersRepository';
import facebookSocialMediaService from './infra/facebookSocialMediaService';
import mongoUsersRepository from './infra/mongoose/repositories/mongoUsersRepository';
import jwtTokenProvider from './providers/TokenProvider/implementations/jwtTokenProvider';
import TokenProvider from './providers/TokenProvider/model/TokenProvider';

type Container = {
  authenticateFacebookUser: ReturnType<typeof authenticateFacebookUser>;
  facebookService: SocialMediaService;
  getUserProfile: ReturnType<typeof getUserProfile>;
  tokenProvider: TokenProvider;
  userRepository: UsersRepository;
};

const register = (container: AwilixContainer) =>
  container.register({
    authenticateFacebookUser: asFunction(authenticateFacebookUser),
    facebookService: asFunction(facebookSocialMediaService).singleton(),
    getUserProfile: asFunction(getUserProfile),
    tokenProvider: asFunction(jwtTokenProvider).singleton(),
    userRepository: asFunction(mongoUsersRepository).singleton(),
  });

export {register, Container};
