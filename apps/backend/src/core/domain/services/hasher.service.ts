export const PASSWORD_HASHER = 'PASSWORD_HASHER';

export interface HasherService {
  compare: (plainText: string, hashed: string) => Promise<boolean>;
  encrypt: (plainText: string) => Promise<string>;
}
