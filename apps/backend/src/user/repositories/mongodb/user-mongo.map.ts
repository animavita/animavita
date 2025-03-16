import { MongoLocation, MongoUser, UserDocument } from './user-mongo.schema';
import { UserEntity } from '../user-repository.interface';
import { MongoMapper } from '../../../frameworks/data-services/mongo-generic.map';

export const UserMap: MongoMapper<UserEntity, MongoUser> = {
  toType(document: UserDocument): UserEntity {
    if (!document) return;

    return new UserEntity({
      id: document._id.toString(),
      email: document.email,
      location: document.location
        ? {
            longitude: document.location.coordinates[0],
            latitude: document.location.coordinates[1],
          }
        : null,
      name: document.name,
      password: document.password,
      photoUri: document.photoUri,
      refreshToken: document.refreshToken,
      createdAt: document.createdAt.toString(),
      updatedAt: document.createdAt.toString(),
    });
  },

  toSchema(user: Partial<UserEntity>): MongoUser {
    if (!user) return;

    let location: MongoLocation;
    if (user.location?.longitude && user.location?.latitude) {
      location = {
        type: 'Point',
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
  },
};
