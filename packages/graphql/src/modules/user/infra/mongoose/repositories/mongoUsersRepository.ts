import DataLoader from 'dataloader';
import {v4 as uuid} from 'uuid';

import Provider from '../../../domain/Provider';
import User from '../../../domain/User';
import UsersRepository from '../../../domain/UsersRepository';
import UserModel from '../models/UserModel';

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
          providers: dbUser.providers,
        });
      } catch {
        return null;
      }
    },

    async findUserByProvider(provider: Provider.Type): Promise<User.Type | null> {
      const checkIfUserAlreadyExistsPipeline = [
        {
          $match: {
            $or: [{'providers.id': provider.id}, {'provider.email': provider.email}],
          },
        },
      ];

      const dbUser = await UserModel.aggregate(checkIfUserAlreadyExistsPipeline);

      if (dbUser.length === 0) {
        return null;
      }

      return User.create({
        id: dbUser[0].id,
        providers: dbUser[0].providers,
      });
    },
  };
}
