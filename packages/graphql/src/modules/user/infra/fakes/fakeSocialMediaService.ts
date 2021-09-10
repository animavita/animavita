import SocialMediaService, {SocialUser} from '../../services/SocialMediaService';

export default function fakeSocialMediaService(): SocialMediaService {
  return {
    async getUser(token: string): Promise<SocialUser | null> {
      return {
        id: `socialId-${token}`,
        email: 'mysocialemail@fake.com',
        name: 'fake-user',
      };
    },

    async getUserProfileImage(token: string): Promise<string | undefined> {
      return `${token}/profilePicture.jpeg`;
    },
  };
}
