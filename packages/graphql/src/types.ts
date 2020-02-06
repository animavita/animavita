import DataLoader from 'dataloader';
import {Types} from 'mongoose';
import {Context} from 'koa';

import {IUserDocument} from './modules/user/UserModel';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export type GraphQLDataloaders = {
  UserLoader: DataLoader<DataLoaderKey, IUserDocument>;
};

export interface GraphQLContext {
  dataloaders: GraphQLDataloaders;
  koaContext: Context;
}

export interface KoaContextExt {
  dataloaders: GraphQLDataloaders;
}
