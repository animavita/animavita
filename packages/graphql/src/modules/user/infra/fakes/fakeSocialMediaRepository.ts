import SocialMediaRepository, {SocialUser} from '../../domain/SocialMediaRepository';

export default function fakeSocialMediaRepository(): SocialMediaRepository {
  return {
    async getUser(token: string): Promise<SocialUser | null> {
      return {
        id: `socialId-${token}`,
        email: 'mysocialemail@fake.com',
        name: 'fake-user',
      };
    },

    async getUserProfileImage(token: string): Promise<string | null> {
      return `${token}/profilePicture.jpeg`;
    },
  };
}
