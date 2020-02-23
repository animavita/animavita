import * as graphqlLoaders from '../src/loaders';
import {GraphQLContext} from '../src/types';
import {getDataloaders} from '../src/helper';
import {IUserDocument} from '../src/modules/user/UserModel';

interface ContextVars {
  user: IUserDocument | null;
}
export const getContext = async (context: ContextVars = {user: null}): Promise<GraphQLContext> => {
  const loaders = graphqlLoaders;
  const dataloaders = getDataloaders(loaders);

  return {
    ...context,
    dataloaders,
    koaContext: {},
  };
};
