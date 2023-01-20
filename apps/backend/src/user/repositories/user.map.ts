import { UserType } from '@animavita/models';
import { IUser } from './mongodb/user.interface';

export class UserMap {
  static toType(document: IUser): UserType {
    if (!document) return;
    return {
      id: document._id,
      email: document.email,
      location: document.location,
      name: document.name,
      password: document.password,
      photoUri: document.photoUri,
      refreshToken: document.refreshToken,
    };
  }
}
