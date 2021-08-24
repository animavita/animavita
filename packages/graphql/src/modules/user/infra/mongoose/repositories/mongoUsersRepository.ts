import DataLoader from 'dataloader';
import {v4 as uuid} from 'uuid';

import User from '../../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId} from '../../../domain/UsersRepository';
import UserModel, {IUserDocument} from '../models/UserModel';

export default function mongoUsersRepository(): UsersRepository {
  const userLoader = new DataLoader<string, User.Type>(userIds => UserModel.find({id: {$in: userIds}}));

  return {
    getNextUUID(): string {
      return uuid();
    },

    async create(user: User.Type): Promise<User.Type> {
      await UserModel.create(user);

      return user;
    },

    async update(updatedUser: User.Type): Promise<User.Type> {
      await UserModel.updateOne({id: updatedUser.id}, {$set: updatedUser});

      return updatedUser;
    },

    async findById(id: string): Promise<User.Type | null> {
      try {
        const dbUser = await userLoader.load(id);

        return User.create({
          id: dbUser.id,
          name: dbUser.name,
          emails: dbUser.emails,
          providersIds: dbUser.providersIds,
          profileImages: dbUser.profileImages,
        });
      } catch {
        return null;
      }
    },

    async findUserByEmailOrProviderId({providersIds, emails}: FindUserByEmailOrProviderId): Promise<User.Type | null> {
      const checkIfUserAlreadyExistsPipeline = [
        {
          $match: {
            $or: [{ids: {$in: providersIds}}, {emails: {$in: emails}}],
          },
        },
      ];

      const dbUser: IUserDocument[] = await UserModel.aggregate(checkIfUserAlreadyExistsPipeline);

      if (dbUser.length === 0) {
        return null;
      }

      return User.create({
        id: dbUser[0].id,
        name: dbUser[0].name,
        emails: dbUser[0].emails,
        providersIds: dbUser[0].providersIds,
        profileImages: dbUser[0].profileImages,
      });
    },
  };
}
