import StorageProvider from '../../../shared/providers/StorageProvider/models/StorageProvider';
import {PROVIDERS} from '../../../shared/constants';
import SocialMediaRepository from '../domain/SocialMediaRepository';
import User, {ProvidersId} from '../domain/User';
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
  user: User;
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

  const users = await userRepository.findUserByEmailOrProviderId({
    providersIds: [{id: fbID, providedBy: 'facebook'}],
    emails: [{email, providedBy: 'facebook'}],
  });

  const existingUser = users && users[0];

  if (existingUser) {
    // verify if name was updated
    if (name.length !== existingUser.name.length) {
      await userRepository.updateUser({id: existingUser.id, proprieties: {name}});
    }

    const dbFbID = existingUser.providersIds.find(id => id.providedBy === PROVIDERS.FACEBOOK);

    if (dbFbID?.id !== fbID) {
      const updatedProvidersIds = existingUser.providersIds.map(providerId =>
        providerId.providedBy === 'facebook' ? ({id: fbID, providedBy: 'facebook'} as ProvidersId) : providerId,
      );

      await userRepository.updateUser({
        id: existingUser.id,
        proprieties: {providersIds: updatedProvidersIds},
      });
    }

    const existingFbProfileImages = existingUser.profileImages.find(
      profileImage => profileImage.providedBy === 'facebook',
    );

    const shouldUpdateProfileImage = !existingFbProfileImages || existingUser.profileImages.length === 0;

    if (profileUrl && shouldUpdateProfileImage) {
      const url = await storageProvider.saveFile({userId: existingUser.id, imageURL: profileUrl});

      await userRepository.updateUser({
        id: existingUser.id,
        proprieties: {profileImages: [...existingUser.profileImages, {url, providedBy: 'facebook'}]},
      });
    }

    const updatedUser = await userRepository.findById(existingUser.id);

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      user: updatedUser,
      token: tokenProvider.generateToken(updatedUser.id),
    };
  } else {
    const newUser = new User({
      id: userRepository.getNextUUID(),
      providersIds: [{id: fbID, providedBy: 'facebook'}],
      emails: [{email, providedBy: 'facebook'}],
      name,
      profileImages: [],
    });

    if (profileUrl) {
      const url = await storageProvider.saveFile({userId: newUser.id, imageURL: profileUrl});

      newUser.profileImages = [{url, providedBy: 'facebook'}];
    }

    await userRepository.createUser(newUser);

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
