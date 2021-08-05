import DataLoader from 'dataloader';
import {v4 as uuid} from 'uuid';

import User from '../../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId} from '../../../domain/UsersRepository';
import UserModel, {IUserDocument} from '../models/UserModel';

export default function mongoUsersRepository(): UsersRepository {
  const userLoader = new DataLoader<string, User>(userIds => UserModel.find({id: {$in: userIds}}));

  return {
    getNextUUID(): string {
      return uuid();
    },

    async create(user: User): Promise<User> {
      await UserModel.create(user);

      return user;
    },

    async update(updatedUser: User): Promise<User> {
      await UserModel.updateOne({id: updatedUser.id}, {$set: updatedUser});

      return updatedUser;
    },

    async findById(id: string): Promise<User | null> {
      try {
        const dbUser = await userLoader.load(id);

        return new User({
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

    async findUserByEmailOrProviderId({providersIds, emails}: FindUserByEmailOrProviderId): Promise<User[]> {
      const checkIfUserAlreadyExistsPipeline = [
        {
          $match: {
            $or: [{ids: {$in: providersIds}}, {emails: {$in: emails}}],
          },
        },
      ];

      const dbUser: IUserDocument[] = await UserModel.aggregate(checkIfUserAlreadyExistsPipeline);

      return dbUser.map(
        user =>
          new User({
            id: user.id,
            name: user.name,
            emails: user.emails,
            providersIds: user.providersIds,
            profileImages: user.profileImages,
          }),
      );
    },
  };
}
