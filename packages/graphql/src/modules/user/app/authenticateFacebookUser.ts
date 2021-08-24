import StorageProvider from '../../../shared/providers/StorageProvider/models/StorageProvider';
import {PROVIDERS} from '../../../shared/constants';
import SocialMediaRepository from '../domain/SocialMediaRepository';
import User from '../domain/User';
import UsersRepository from '../domain/UsersRepository';
import TokenProvider from '../providers/TokenProvider/model/TokenProvider';

interface Dependencies {
  facebookRepository: SocialMediaRepository;
  userRepository: UsersRepository;
  storageProvider: StorageProvider;
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

const authenticateFacebookUser = ({
  userRepository,
  facebookRepository,
  storageProvider,
  tokenProvider,
}: Dependencies) => async ({token}: SaveFbDTO): Promise<SaveFBResponse> => {
  const socialUserInfo = await facebookRepository.getUser(token);

  if (!socialUserInfo || !socialUserInfo.email) {
    throw new Error('Failed to fetch basic user data');
  }

  const profileUrl = await facebookRepository.getUserProfileImage(token);

  const {id: fbID, email, name} = socialUserInfo;

  const user = await userRepository.findUserByEmailOrProviderId({
    providersIds: [{id: fbID, providedBy: 'facebook'}],
    emails: [{email, providedBy: 'facebook'}],
  });

  if (user) {
    let updatedUser = User.updateName(user, name);

    updatedUser = User.updateFacebookId(updatedUser, fbID);

    const existingFbProfileImages = updatedUser.profileImages.find(
      profileImage => profileImage.providedBy === 'facebook',
    );
    const shouldUpdateProfileImage = !existingFbProfileImages || updatedUser.profileImages.length === 0;

    if (shouldUpdateProfileImage && profileUrl) {
      const url = await storageProvider.saveFile({userId: updatedUser.id, imageURL: profileUrl});

      updatedUser = User.updateFacebookProfileImage(updatedUser, url);
    }

    if (JSON.stringify(user) !== JSON.stringify(updatedUser)) {
      await userRepository.update(updatedUser);
    }

    return {
      user: updatedUser,
      token: tokenProvider.generateToken(updatedUser.id),
    };
  } else {
    const newUser = User.create({
      id: userRepository.getNextUUID(),
      providersIds: [{id: fbID, providedBy: 'facebook'}],
      emails: [{email, providedBy: 'facebook'}],
      name,
      profileImages: profileUrl ? [{url: profileUrl, providedBy: 'facebook'}] : [],
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
