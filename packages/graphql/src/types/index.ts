import {Types} from 'mongoose';
import {Context} from 'koa';
import {OptionsData} from 'koa-graphql';
import {GraphQLSchema} from 'graphql';

import User from '../modules/user/domain/User';
import {Container} from '../shared/container';

export type DataLoaderKey = Types.ObjectId | string | undefined | null;

export interface KoaContextExt {
  container: Container;
  user: User | null;
}

export interface GraphQLContext extends KoaContextExt {
  koaContext: Partial<Context>;
}

export interface GraphqlHttp extends Omit<OptionsData, 'schema'> {
  schema: GraphQLSchema;
}
