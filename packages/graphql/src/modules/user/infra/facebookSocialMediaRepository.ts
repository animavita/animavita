import axios from 'axios';

import SocialMediaRepository, {SocialUser} from '../domain/SocialMediaRepository';

export default function facebookSocialMediaRepository(): SocialMediaRepository {
  const client = axios.create({
    baseURL: 'https://graph.facebook.com',
  });

  return {
    async getUser(token: string): Promise<SocialUser | null> {
      try {
        const response = await client.get<SocialUser>(`/me?fields=id,name,email&access_token=${token}`);
        const user = response.data;
        return user;
      } catch {
        return null;
      }
    },

    async getUserProfileImage(token: string): Promise<string | null> {
      try {
        const response = await client.get(`/me/picture?height=720&width=720&redirect=false&access_token=${token}`);
        const {
          data: {url},
        } = response.data;

        return url;
      } catch {
        return null;
      }
    },
  };
}
