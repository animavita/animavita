import SocialMediaService from '../services/SocialMediaService';
import User from '../domain/User';
import UsersRepository from '../domain/UsersRepository';
import TokenProvider from '../providers/TokenProvider/model/TokenProvider';
import Provider from '../domain/Provider';

interface Dependencies {
  facebookService: SocialMediaService;
  userRepository: UsersRepository;
  tokenProvider: TokenProvider;
}

interface SaveFbDTO {
  token: string;
  expires: number;
  permissions: string[];
}

export interface SaveFBResponse {
  user: User.Type;
  token: string;
}

const authenticateFacebookUser = ({userRepository, facebookService, tokenProvider}: Dependencies) => async ({
  token,
}: SaveFbDTO): Promise<SaveFBResponse> => {
  const socialUserInfo = await facebookService.getUser(token);

  if (!socialUserInfo || !socialUserInfo.email) {
    throw new Error('Failed to fetch basic user data');
  }

  const profileUrl = await facebookService.getUserProfileImage(token);

  const {id: fbID, email, name} = socialUserInfo;

  const provider = Provider.create({
    id: fbID,
    email,
    name,
    origin: 'facebook',
    profileImage: profileUrl,
    lastLogIn: Date.now(),
  });

  const user = await userRepository.findUserByProvider(provider);

  if (user) {
    const syncedUser = User.syncProvider(user, provider);

    await userRepository.update(syncedUser);

    return {
      user: syncedUser,
      token: tokenProvider.generateToken(syncedUser.id),
    };
  } else {
    const newUser = User.create({
      id: userRepository.getNextUUID(),
      providers: [provider],
    });

    await userRepository.create(newUser);

    // TODO: Add queue to send welcome email
    // await queueStandardJob({
    //   jobName: USER_JOBS.USER.EMAIL_WELCOME,
    //   data: {userId: user._id},
    // });
    return {
      user: newUser,
      token: tokenProvider.generateToken(newUser.id),
    };
  }
};

export default authenticateFacebookUser;
