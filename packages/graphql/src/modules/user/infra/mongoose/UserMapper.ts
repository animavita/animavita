import mongoose from 'mongoose';

import {DataMapper} from '../../../../shared/DDD';
import User from '../../domain/User';

import {IUserSchema} from './models/UserModel';

const UserMapper: DataMapper<User.Type, IUserSchema> = {
  toData: (entity: User.Type) => ({
    _id: mongoose.Types.ObjectId(entity.id),
    providers: entity.providers,
  }),
  toEntity: (data: IUserSchema) => ({
    id: data._id.toString(),
    providers: data.providers,
  }),
};

export {UserMapper};
