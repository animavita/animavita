import DataLoader from 'dataloader';
import {mongooseLoader} from '@entria/graphql-mongoose-loader';
import {Types} from 'mongoose';

import {DataLoaderKey, GraphQLContext} from '../../../../../types';
import {Email, Id, ProfileImage} from '../../../domain/User';
import UserModel, {IUserDocument} from '../../../infra/mongoose/models/UserModel';

export default class User {
  public registeredType = 'User';

  id: string;
  _id: string;
  name: string;
  emails: Email[];
  providerIds: Id[];
  profileImages: ProfileImage[];

  constructor(data: IUserDocument) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.emails = data.emails;
    this.providerIds = data.providersIds;
    this.profileImages = data.profileImages || [];
  }
}

const viewerCanSee = (ctx: GraphQLContext, data: IUserDocument): User => new User(data);

export const getLoader = () =>
  new DataLoader<DataLoaderKey, IUserDocument>(ids => mongooseLoader(UserModel, ids as string[]));

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
export const primeCache = ({dataloaders}: GraphQLContext, id: Types.ObjectId, data: IUserDocument) =>
  dataloaders.UserLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IUserDocument) =>
  clearCache(context, id) && primeCache(context, id, data);
