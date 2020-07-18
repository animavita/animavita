import DataLoader from 'dataloader';
import {Types} from 'mongoose';
import {Context} from 'koa';

import {IUserDocument} from './modules/user/UserModel';
import {IAdoptionDocument} from './modules/adoption/AdoptionModel';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export type GraphQLDataloaders = {
  UserLoader: DataLoader<DataLoaderKey, IUserDocument>;
  AdoptionLoader: DataLoader<DataLoaderKey, IAdoptionDocument>;
};

export interface KoaContextExt {
  dataloaders: GraphQLDataloaders;
  user: IUserDocument | null;
  adoption: IAdoptionDocument | null;
}

export interface GraphQLContext extends KoaContextExt {
  koaContext: Partial<Context>;
}
