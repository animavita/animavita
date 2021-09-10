export interface SocialUser {
  id: string;
  name: string;
  email: string;
}

export default interface SocialMediaRepository {
  getUser(toke: string): Promise<SocialUser | null>;
  getUserProfileImage(token: string): Promise<string | undefined>;
}
