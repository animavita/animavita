import { applyMiddlewareRule } from '../utils/middleware';
import resolvers from '../graphql/resolvers';

/* The middleware will not be applied to the resolvers of this array */
const exceptions = ['login', 'register'];

/* The middleware handle function ( Rule ) */
const handle = async (resolve, parent, args, context) => {
  if (!context.user) {
    throw new Error('Unauthorized!');
  }

  return resolve();
};

export default {
  /*
   * Auth: is a Middleware function above
   * Resolvers.Query: my query object with all resolvers
   * exceptions: array of resolvers exceptions (name of resolvers that
   * middleware will not be applied)
   */

  Query: applyMiddlewareRule(handle, resolvers.Query),
  Mutation: applyMiddlewareRule(handle, resolvers.Mutation, exceptions) // No exceptions
};
