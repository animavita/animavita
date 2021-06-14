export interface SocialUser {
  id: string;
  name: string;
  email: string;
}

export interface GetSocialProfileImage {
  id: string;
  token: string;
}

export default interface SocialMediaRepository {
  getUser(toke: string): Promise<SocialUser | null>;
  getUserProfileImage({id, token}: GetSocialProfileImage): Promise<string | null>;
}
