import { UserType } from '@animavita/models';
import { IUser, UserDocument, Location } from './mongodb/user.interface';

export class UserMap {
  static toType(document: UserDocument): UserType {
    if (!document) return;
    return {
      id: document._id,
      email: document.email,
      location: {
        longitude: document.location.coordinates[0],
        latitude: document.location.coordinates[1],
      },
      name: document.name,
      password: document.password,
      photoUri: document.photoUri,
      refreshToken: document.refreshToken,
    };
  }

  static toSchema(user: Partial<UserType>): IUser {
    if (!user) return;

    let location: Location;
    if (user.location?.longitude && user.location?.latitude) {
      location = {
        coordinates: [user.location.longitude, user.location.latitude],
      };
    }

    return {
      email: user.email,
      name: user.name,
      password: user.password,
      photoUri: user.photoUri,
      refreshToken: user.refreshToken,
      location,
    };
  }
}
