import DataLoader from 'dataloader';
import {Types} from 'mongoose';
import {Context} from 'koa';

import User from '../modules/user/domain/User';
import {IUserDocument} from '../modules/user/infra/mongoose/models/UserModel';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export type GraphQLDataloaders = {
  UserLoader: DataLoader<DataLoaderKey, IUserDocument>;
};

export interface KoaContextExt {
  dataloaders: GraphQLDataloaders;
  user: User | null;
}

export interface GraphQLContext extends KoaContextExt {
  koaContext: Partial<Context>;
}
