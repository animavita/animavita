import DataLoader from 'dataloader';
import {mongooseLoader} from '@entria/graphql-mongoose-loader';
import {Types} from 'mongoose';

import UserModel, {IUser} from './UserModel';
import {DataLoaderKey, GraphQLContext} from '../../types';

export default class User {
  id: string;
  _id: string;
  name: string;
  emails: {email: string}[];

  constructor(data: IUser) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.emails = data.emails;
  }
}

const viewerCanSee = (ctx: GraphQLContext, data: IUser): User => new User(data);

export const getLoader = () => new DataLoader<DataLoaderKey, IUser>(ids => mongooseLoader(UserModel, ids as string[]));

export const load = async (context: GraphQLContext, id: DataLoaderKey) => {
  if (!id) return null;

  try {
    const data = await context.dataloaders.UserLoader.load(id);

    return viewerCanSee(context, data);
  } catch (err) {
    return null;
  }
};

export const clearCache = ({dataloaders}: GraphQLContext, id: Types.ObjectId) =>
  dataloaders.UserLoader.clear(id.toString());
export const primeCache = ({dataloaders}: GraphQLContext, id: Types.ObjectId, data: IUser) =>
  dataloaders.UserLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IUser) =>
  clearCache(context, id) && primeCache(context, id, data);
