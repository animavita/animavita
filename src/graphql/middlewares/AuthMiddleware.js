import { applyMiddlewareRule } from '../../utils/middleware';
import resolvers from '../resolvers';

/* The middleware will not be applied to the resolvers of this array */
const exceptions = ['login', 'register'];

/* The middleware handle function ( Rule ) */
const Auth = async (resolve, parent, args, context) => {
  const Authorization = context.request.get('Authorization');
  const splited = Authorization.split(' ');
  if (!Authorization) {
    throw new Error('No token provided!');
  }

  if (!splited.length === 2) {
    throw new Error('Invalid Token!');
  }

  const [type, token] = splited;

  if (!/^Bearer$/i.test(type)) {
    throw new Error('Invalid Token!');
  }

  // Validate the token here

  return resolve();
};

export default {
  /*
   * Auth: is a Middleware function above
   * Resolvers.Query: my query object with all resolvers
   * exceptions: array of resolvers exceptions (name of resolvers that
   * middleware will not be applied)
   */

  Query: applyMiddlewareRule(Auth, resolvers.Query),
  Mutation: applyMiddlewareRule(Auth, resolvers.Mutation, exceptions) // No exceptions
};
