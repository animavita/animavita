import SocialMediaRepository, {SocialUser, GetSocialProfileImage} from '../../domain/SocialMediaRepository';

export default class FakeFacebookRepository implements SocialMediaRepository {
  public async getUser(token: string): Promise<SocialUser | null> {
    return {
      id: `socialId-${token}`,
      email: 'mysocialemail@fake.com',
      name: 'fake-user',
    };
  }

  public async getUserProfileImage({id, token}: GetSocialProfileImage): Promise<string | null> {
    return `${id}-${token}/profilePicture.jpeg`;
  }
}
