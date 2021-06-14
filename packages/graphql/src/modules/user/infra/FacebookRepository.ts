import axios from 'axios';

import SocialMediaRepository, {SocialUser, GetSocialProfileImage} from '../domain/SocialMediaRepository';
export default class FacebookRepository implements SocialMediaRepository {
  async getUser(token: string): Promise<SocialUser | null> {
    try {
      const response = await axios.get<SocialUser>(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`,
      );
      const user = response.data;
      return user;
    } catch {
      return null;
    }
  }

  async getUserProfileImage({id, token}: GetSocialProfileImage): Promise<string | null> {
    try {
      const response = await axios.get<{url: string}>(
        `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${token}`,
      );
      const {url} = response.data;
      return url;
    } catch {
      return null;
    }
  }
}
