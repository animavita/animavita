import DataLoader from 'dataloader';
import {Types} from 'mongoose';
import {Context} from 'koa';

import {IUserDocument} from './modules/user/UserModel';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export type GraphQLDataloaders = {
  UserLoader: DataLoader<DataLoaderKey, IUserDocument>;
};

export interface KoaContextExt {
  dataloaders: GraphQLDataloaders;
  user: IUserDocument | null;
}

export interface GraphQLContext extends KoaContextExt {
  koaContext: Context;
}
