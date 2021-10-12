import DataLoader from 'dataloader';
import mongoose from 'mongoose';

import Provider from '../../../domain/Provider';
import User from '../../../domain/User';
import UsersRepository from '../../../domain/UsersRepository';
import UserModel, {IUserSchema} from '../models/UserModel';
import {UserMapper} from '../UserMapper';

export default function mongoUsersRepository(): UsersRepository {
  const userLoader = new DataLoader<mongoose.Types.ObjectId, IUserSchema>(userIds =>
    UserModel.find({_id: {$in: userIds}}),
  );

  return {
    getNextUUID(): string {
      return mongoose.Types.ObjectId().toString();
    },

    async create(user: User.Type): Promise<User.Type> {
      const userData = UserMapper.toData(user);
      await UserModel.create(userData);

      return user;
    },

    async update(updatedUser: User.Type): Promise<User.Type> {
      const {_id, ...data} = UserMapper.toData(updatedUser);
      await UserModel.updateOne({_id}, {$set: data});

      return updatedUser;
    },

    async findById(id: string): Promise<User.Type | null> {
      try {
        const dbUser = await userLoader.load(mongoose.Types.ObjectId(id));

        return UserMapper.toEntity(dbUser);
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

      return UserMapper.toEntity(dbUser[0]);
    },
  };
}
