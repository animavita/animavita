import {v4 as uuid} from 'uuid';

import User from '../../../domain/User';
import UsersRepository, {FindUserByEmailOrProviderId, UpdateUser} from '../../../domain/UsersRepository';
import UserModel, {IUserDocument} from '../models/UserModel';

export default function mongoUsersRepository(): UsersRepository {
  return {
    getNextUUID(): string {
      return uuid();
    },

    async createUser({id, name, emails, profileImages, providersIds}: User): Promise<User> {
      const dbUser = await UserModel.create({id, name, emails, profileImages, providersIds});

      return new User({
        id: dbUser._id,
        name: dbUser.name,
        emails: dbUser.emails,
        providersIds: dbUser.providersIds,
        profileImages: dbUser.profileImages,
      });
    },

    async findById(id): Promise<User | null> {
      const dbUser = await UserModel.findById(id).lean();

      if (!dbUser) return null;

      return new User({
        id: dbUser._id,
        name: dbUser.name,
        emails: dbUser.emails,
        providersIds: dbUser.providersIds,
        profileImages: dbUser.profileImages,
      });
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
            id: user._id,
            name: user.name,
            emails: user.emails,
            providersIds: user.providersIds,
            profileImages: user.profileImages,
          }),
      );
    },

    async updateUser({id, proprieties}: UpdateUser): Promise<User> {
      await UserModel.updateOne({_id: id}, {$set: {...proprieties}});
      const dbUser = await UserModel.findById(id).lean();

      return new User({
        id: dbUser?._id || '',
        name: dbUser?.name || '',
        emails: dbUser?.emails || [],
        providersIds: dbUser?.providersIds || [],
        profileImages: dbUser?.profileImages || [],
      });
    },
  };
}
